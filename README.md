# Heaven DEX Token Launchpad

A Solana-based DeFi project template for token creation, swapping, and metadata management using the **Heaven DEX** protocol.

## 🎯 Overview

This project demonstrates the integration with Heaven DEX for:
- **Token Creation & Deployment** on Solana blockchain
- **Token Swapping** through Heaven DEX protocol
- **IPFS Metadata Management** using Pinata for decentralized storage
- **Address Lookup Table (LUT)** resolution for optimized transactions

<img width="1039" height="835" alt="heaven1" src="https://github.com/user-attachments/assets/2b99edfa-bfff-4fe9-9b2b-12d87ffebd1f" />
<img width="1679" height="813" alt="heaven2" src="https://github.com/user-attachments/assets/38557d9a-a0ac-4e2c-af98-ab7cfd2b3e46" />
<img width="1126" height="812" alt="heaven3" src="https://github.com/user-attachments/assets/7e6b3684-ec0a-44c7-8150-a0e15268e379" />
<img width="1144" height="819" alt="heaven4" src="https://github.com/user-attachments/assets/629ebc9b-9cc8-49d0-96c9-e63ecac5dcda" />

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

- **Twitter**: [@michalstefanow](https://twitter.com/michalstefanow)
- **Telegram**: [@michalstefanow](https://t.me/mylord1_1)




