# Heaven DEX Token Launchpad

A Solana-based DeFi project template for token creation, swapping, and metadata management using the **Heaven DEX** protocol.

## 🎯 Overview

This project demonstrates the integration with Heaven DEX for:
- **Token Creation & Deployment** on Solana blockchain
- **Token Swapping** through Heaven DEX protocol
- **IPFS Metadata Management** using Pinata for decentralized storage
- **Address Lookup Table (LUT)** resolution for optimized transactions

[Buy / Sell Transaction with idl](https://solscan.io/tx/5dzu8GmeEpEbX2fMUhAUGGJyxuxifQP27skvuVJhxcitP34sxsmGwEdyoYG6ukZyo2xXYrHd1vGLCpRhnPhT2ZSW)

<img width="720" height="586" alt="image" src="https://github.com/user-attachments/assets/17d9c960-a2de-4962-beb2-ad1322c26b32" />
<img width="720" height="616" alt="image" src="https://github.com/user-attachments/assets/fa39ef90-b380-442b-8100-ef23c392fd17" />


## 🏗️ Architecture

```
Heaven-Dex-Token-Launchpad/
├── constants/          # Solana RPC endpoints & configuration
├── type/              # TypeScript interfaces & types
├── utils/             # Core utility functions
│   ├── upload.ts      # IPFS upload via Pinata
│   └── metadata.ts    # Token metadata templates
├── images/            # Token profile images
└── index.ts           # Main application entry point
```

## 🚀 Features

- **🔧 Token Lifecycle Management**: Create, buy, and sell tokens
- **🌐 IPFS Integration**: Decentralized metadata and image storage
- **⚡ Solana Optimization**: LUT resolution for transaction efficiency
- **🔒 Type Safety**: Full TypeScript implementation
- **📱 Multi-Platform**: Support for both local and remote assets

## 📁 Project Structure

### Core Components

- **`constants/index.ts`**: RPC endpoints, program IDs, and configuration
- **`type/index.ts`**: TypeScript interfaces for metadata and API responses
- **`utils/upload.ts`**: IPFS file and metadata upload utilities
- **`utils/metadata.ts`**: Token metadata templates and schemas
- **`index.ts`**: Main application workflow

### Key Interfaces

```typescript
interface metadataInfo {
  name: string;
  symbol: string;
  image: string;
  description: string;
  createdOn: string;
  twitter?: string;
  website?: string;
  telegram?: string;
}
```

## 🔗 Heaven DEX Integration

- **Program ID**: `HEAVENoP2qxoeuF8Dj2oT1GHEnu49U5mJYkdeC8BAX2o`
- **LUT Address**: `3DENDMbqpVuarsEvk3MYJMpcZqsrQanK8Z8cVeDf53oR`
- **API Endpoint**: `https://tx.api.heaven.xyz/`

## 📚 Development Status

⚠️ **Note**: This project is currently a template/demonstration implementation. The core token operations (`createToken`, `buyToken`, `sellToken`) are referenced but not fully implemented.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

- **Telegram**: [@mooneagle1_1](https://t.me/@mooneagle1_1)






