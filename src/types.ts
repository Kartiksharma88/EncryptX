export interface LogEntry {
  id: string;
  timestamp: string;
  action: 'encrypt' | 'decrypt' | 'key_generated' | 'key_imported' | 'key_exported' | 'error';
  filename?: string;
  algorithm: string;
  status: 'success' | 'error' | 'warning';
  message: string;
}

export interface EncryptionProgress {
  filename: string;
  progress: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
}

export interface EncryptedFile {
  name: string;
  data: ArrayBuffer;
  iv: Uint8Array;
  salt: Uint8Array;
  originalName: string;
  algorithm: string;
  timestamp: string;
}

export interface CryptoKey {
  id: string;
  name: string;
  algorithm: string;
  created: string;
  keyData: string; // Base64 encoded
}