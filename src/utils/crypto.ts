import { EncryptedFile } from '../types';

/**
 * Cryptographic utility functions for file encryption and decryption
 * Uses AES-256-GCM with PBKDF2 key derivation for maximum security
 */

const ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256;
const IV_LENGTH = 12;
const SALT_LENGTH = 16;
const PBKDF2_ITERATIONS = 100000;

/**
 * Generate a random salt for key derivation
 */
export function generateSalt(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
}

/**
 * Generate a random initialization vector
 */
export function generateIV(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(IV_LENGTH));
}

/**
 * Derive a cryptographic key from a password using PBKDF2
 */
export async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256'
    },
    keyMaterial,
    {
      name: ALGORITHM,
      length: KEY_LENGTH
    },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypt a file using AES-256-GCM
 */
export async function encryptFile(
  file: File,
  password: string,
  onProgress?: (progress: number) => void
): Promise<EncryptedFile> {
  try {
    const salt = generateSalt();
    const iv = generateIV();
    const key = await deriveKey(password, salt);

    // Read file data
    const fileData = await file.arrayBuffer();
    
    // Simulate progress for user feedback
    if (onProgress) {
      onProgress(25);
    }

    // Encrypt the file data
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: ALGORITHM,
        iv
      },
      key,
      fileData
    );

    if (onProgress) {
      onProgress(100);
    }

    return {
      name: `${file.name}.encrypted`,
      data: encryptedData,
      iv,
      salt,
      originalName: file.name,
      algorithm: 'AES-256-GCM',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    throw new Error(`Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Decrypt a file using AES-256-GCM
 */
export async function decryptFile(
  encryptedFile: EncryptedFile,
  password: string,
  onProgress?: (progress: number) => void
): Promise<{ data: ArrayBuffer; filename: string }> {
  try {
    const key = await deriveKey(password, encryptedFile.salt);

    if (onProgress) {
      onProgress(25);
    }

    // Decrypt the file data
    const decryptedData = await crypto.subtle.decrypt(
      {
        name: ALGORITHM,
        iv: encryptedFile.iv
      },
      key,
      encryptedFile.data
    );

    if (onProgress) {
      onProgress(100);
    }

    return {
      data: decryptedData,
      filename: encryptedFile.originalName
    };
  } catch (error) {
    throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Invalid password or corrupted file'}`);
  }
}

/**
 * Verify file integrity by attempting decryption with a test pattern
 */
export async function verifyFileIntegrity(
  encryptedFile: EncryptedFile,
  password: string
): Promise<boolean> {
  try {
    await decryptFile(encryptedFile, password);
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate a secure random password
 */
export function generateSecurePassword(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.getRandomValues(new Uint8Array(1))[0] % chars.length;
    password += chars[randomIndex];
  }
  
  return password;
}

/**
 * Calculate password strength score (0-100)
 */
export function calculatePasswordStrength(password: string): {
  score: number;
  feedback: string;
  color: string;
} {
  if (!password) {
    return { score: 0, feedback: 'Enter a password', color: 'gray' };
  }

  let score = 0;
  const checks = {
    length: password.length >= 12,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    symbols: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    noRepeat: !/(.)\1{2,}/.test(password),
    noCommon: !isCommonPassword(password)
  };

  // Calculate score based on criteria
  score += checks.length ? 20 : (password.length >= 8 ? 10 : 0);
  score += checks.lowercase ? 10 : 0;
  score += checks.uppercase ? 10 : 0;
  score += checks.numbers ? 15 : 0;
  score += checks.symbols ? 20 : 0;
  score += checks.noRepeat ? 10 : 0;
  score += checks.noCommon ? 15 : 0;

  // Determine feedback and color
  if (score >= 80) {
    return { score, feedback: 'Very Strong', color: 'green' };
  } else if (score >= 60) {
    return { score, feedback: 'Strong', color: 'blue' };
  } else if (score >= 40) {
    return { score, feedback: 'Moderate', color: 'yellow' };
  } else if (score >= 20) {
    return { score, feedback: 'Weak', color: 'orange' };
  } else {
    return { score, feedback: 'Very Weak', color: 'red' };
  }
}

/**
 * Check if password is commonly used (basic check)
 */
function isCommonPassword(password: string): boolean {
  const commonPasswords = [
    'password', '123456', '12345678', 'qwerty', 'abc123',
    'password123', 'admin', 'letmein', 'welcome', 'monkey'
  ];
  return commonPasswords.includes(password.toLowerCase());
}

/**
 * Create a downloadable blob from encrypted file data
 */
export function createDownloadBlob(encryptedFile: EncryptedFile): Blob {
  // Create a structured format for the encrypted file
  const metadata = {
    originalName: encryptedFile.originalName,
    algorithm: encryptedFile.algorithm,
    timestamp: encryptedFile.timestamp,
    salt: Array.from(encryptedFile.salt),
    iv: Array.from(encryptedFile.iv)
  };

  const metadataStr = JSON.stringify(metadata);
  const metadataLength = new TextEncoder().encode(metadataStr).length;
  
  // Create final blob with metadata header + encrypted data
  const header = new Uint32Array([metadataLength]);
  const metadataBytes = new TextEncoder().encode(metadataStr);
  const encryptedBytes = new Uint8Array(encryptedFile.data);
  
  const combinedData = new Uint8Array(header.byteLength + metadataBytes.byteLength + encryptedBytes.byteLength);
  combinedData.set(new Uint8Array(header.buffer), 0);
  combinedData.set(metadataBytes, header.byteLength);
  combinedData.set(encryptedBytes, header.byteLength + metadataBytes.byteLength);
  
  return new Blob([combinedData], { type: 'application/octet-stream' });
}

/**
 * Parse an encrypted file blob back to EncryptedFile structure
 */
export async function parseEncryptedBlob(blob: Blob): Promise<EncryptedFile> {
  const arrayBuffer = await blob.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);
  
  // Read metadata length
  const metadataLength = new Uint32Array(data.buffer, 0, 1)[0];
  
  // Read metadata
  const metadataBytes = data.slice(4, 4 + metadataLength);
  const metadataStr = new TextDecoder().decode(metadataBytes);
  const metadata = JSON.parse(metadataStr);
  
  // Read encrypted data
  const encryptedData = data.slice(4 + metadataLength);
  
  return {
    name: `${metadata.originalName}.encrypted`,
    data: encryptedData.buffer,
    iv: new Uint8Array(metadata.iv),
    salt: new Uint8Array(metadata.salt),
    originalName: metadata.originalName,
    algorithm: metadata.algorithm,
    timestamp: metadata.timestamp
  };
}