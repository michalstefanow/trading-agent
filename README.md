# Heaven DEX Token Launchpad

A Solana-based DeFi project template for token creation, swapping, and metadata management using the **Heaven DEX** protocol.

## 🎯 Overview

This project demonstrates the integration with Heaven DEX for:
- **Token Creation & Deployment** on Solana blockchain
- **Token Swapping** through Heaven DEX protocol
- **IPFS Metadata Management** using Pinata for decentralized storage
- **Address Lookup Table (LUT)** resolution for optimized transactions

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

## 🛠️ Tech Stack

- **Blockchain**: Solana
- **DEX Protocol**: Heaven DEX
- **Storage**: IPFS (Pinata)
- **Language**: TypeScript
- **Runtime**: Node.js
- **Key Libraries**: 
  - `@solana/web3.js` - Solana blockchain interaction
  - `@coral-xyz/anchor` - Solana program framework
  - `dotenv` - Environment configuration

## 📋 Prerequisites

- Node.js >= 16.0.0
- Solana CLI tools
- Pinata API keys
- Solana RPC endpoint access

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/michalstefanow/Solana-Token-Launchpad-Heaven-Dex.git
cd Solana-Token-Launchpad-Heaven-Dex

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
```

## 🔧 Configuration

Create a `.env` file with your credentials:

```env
RPC_ENDPOINT_HELIUS=https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY
RPC_ENDPOINT=https://your-rpc-endpoint.com
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
NEXT_PUBLIC_PINATA_SECRET_API_KEY=your_pinata_secret_key
PRIVATE_KEY=your_solana_private_key
```

## 🚀 Usage

```bash
# Run the token lifecycle demo
npm start

# Build TypeScript
npm run build

# Run tests
npm test
```

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

## 🔗 Links

- [Heaven DEX](https://heaven.xyz)
- [Solana Documentation](https://docs.solana.com)
- [Pinata IPFS](https://pinata.cloud)

---

**Disclaimer**: This is a demonstration project. Always test thoroughly on devnet before mainnet deployment.

