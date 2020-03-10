const ABI_CPII = [
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "recipient",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "sender",
        "type": "address"
      },
      {
        "name": "recipient",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isOwner",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "currentOwner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "cuentaInversor",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "nombre",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "cif",
        "type": "string"
      }
    ],
    "name": "InversorRegistrado",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "cuentaInversor",
        "type": "address"
      }
    ],
    "name": "InversorBorrado",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "idProyecto",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "cuentaInversor",
        "type": "address"
      }
    ],
    "name": "ProyectoInversorBorrado",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "nombre",
        "type": "string"
      },
      {
        "name": "cif",
        "type": "string"
      }
    ],
    "name": "registrarInversor",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "cuentaInversor",
        "type": "address"
      }
    ],
    "name": "consultarInversor",
    "outputs": [
      {
        "name": "nombre",
        "type": "string"
      },
      {
        "name": "cif",
        "type": "string"
      },
      {
        "name": "proyectos",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "cuentaInversor",
        "type": "address"
      }
    ],
    "name": "listarProyectosInversor",
    "outputs": [
      {
        "name": "proyectos",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "tokensInvertidosEnProyecto",
    "outputs": [
      {
        "name": "ctaPromotor",
        "type": "address"
      },
      {
        "name": "tokensInversor",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "last_completed_migration",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "completed",
        "type": "uint256"
      }
    ],
    "name": "setCompleted",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "currentOwner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isOwner",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "listarPromotoress",
    "outputs": [
      {
        "name": "_promotores",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "idProyecto",
        "type": "bytes32"
      },
      {
        "name": "nombre",
        "type": "string"
      },
      {
        "name": "fechaInicioFinanciacion",
        "type": "uint256"
      },
      {
        "name": "fechaFinFinanciacion",
        "type": "uint256"
      },
      {
        "name": "fechaInicioEjecucion",
        "type": "uint256"
      },
      {
        "name": "fechaFinEjecucion",
        "type": "uint256"
      },
      {
        "name": "tokensGoal",
        "type": "uint256"
      },
      {
        "name": "rentabilidad",
        "type": "uint256"
      }
    ],
    "name": "registrarProyecto",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "listarProyectos",
    "outputs": [
      {
        "name": "_proyectos",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "cuentaInversor",
        "type": "address"
      }
    ],
    "name": "consultarInversor",
    "outputs": [
      {
        "name": "nombre",
        "type": "string"
      },
      {
        "name": "cif",
        "type": "string"
      },
      {
        "name": "proyectos",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "tokensInvertidosEnProyecto",
    "outputs": [
      {
        "name": "ctaPromotor",
        "type": "address"
      },
      {
        "name": "tokensInversor",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "idProyecto",
        "type": "bytes32"
      },
      {
        "name": "cuentaInversor",
        "type": "address"
      }
    ],
    "name": "listarTokensPorProyectosPorInversor",
    "outputs": [
      {
        "name": "tokensInversor",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "consultarProyecto",
    "outputs": [
      {
        "name": "nombre",
        "type": "string"
      },
      {
        "name": "fechaInicioFinanciacion",
        "type": "uint256"
      },
      {
        "name": "fechaFinFinanciacion",
        "type": "uint256"
      },
      {
        "name": "fechaInicioEjecucion",
        "type": "uint256"
      },
      {
        "name": "fechaFinEjecucion",
        "type": "uint256"
      },
      {
        "name": "tokensGoal",
        "type": "uint256"
      },
      {
        "name": "rentabilidad",
        "type": "uint256"
      },
      {
        "name": "estadoProyecto",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "cuentaPromotor",
        "type": "address"
      }
    ],
    "name": "consultarPromotor",
    "outputs": [
      {
        "name": "nombre",
        "type": "string"
      },
      {
        "name": "cif",
        "type": "string"
      },
      {
        "name": "capacidad",
        "type": "uint256"
      },
      {
        "name": "listadoProyectos",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "cuentaPromotor",
        "type": "address"
      },
      {
        "name": "idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "listarInversoresProyecto",
    "outputs": [
      {
        "name": "_inversores",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "ejecutarProyecto",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isOwner",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "nombre",
        "type": "string"
      },
      {
        "name": "cif",
        "type": "string"
      }
    ],
    "name": "registrarInversor",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "consultarTokensInvertidosEnProyecto",
    "outputs": [
      {
        "name": "tokensInvertidos",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "deleteProyecto",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "currentOwner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "cuentaInversor",
        "type": "address"
      }
    ],
    "name": "listarProyectosInversor",
    "outputs": [
      {
        "name": "proyectos",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "idProyecto",
        "type": "bytes32"
      },
      {
        "name": "_status",
        "type": "uint8"
      }
    ],
    "name": "esEstadoProyectoValido",
    "outputs": [
      {
        "name": "_estadoProyecto",
        "type": "uint8"
      },
      {
        "name": "_esValido",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "account",
        "type": "address"
      },
      {
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_numeroTokens",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_comprados",
        "type": "bool"
      }
    ],
    "name": "TokensEmitidos",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_numeroTokens",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_transferidos",
        "type": "bool"
      }
    ],
    "name": "TokensTransferidos",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_numeroToken",
        "type": "uint256"
      }
    ],
    "name": "TokenPtesCompletarProyecto",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_cuentaInversor",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_idProyecto",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "_numeroTokens",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_invertidos",
        "type": "bool"
      }
    ],
    "name": "TokensInvertidosProyecto",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_cuenta",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_nombre",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "_cif",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "capacidad",
        "type": "uint256"
      }
    ],
    "name": "PromotorRegistrado",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_idProyecto",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "_balanceOfProyecto",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_tokensGoal",
        "type": "uint256"
      }
    ],
    "name": "TokensGoalProyectoNoAlcanzado",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_cuentaPromotor",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "BalanceOfPromotorNoSuficiente",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_cuentaPromotor",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "ProyectoFinalizadoConTransferencias",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "cuentaInversor",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "cuentaPromotor",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "idProyecto",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "numeroTokensProyectoInversor",
        "type": "uint256"
      }
    ],
    "name": "InversorAbandonaProyecto",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_cuentaPromotor",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_cuentaInversor",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_numeroTokens",
        "type": "uint256"
      }
    ],
    "name": "TokensDevueltosInversor",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "cuentaInversor",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "nombre",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "cif",
        "type": "string"
      }
    ],
    "name": "InversorRegistrado",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "cuentaInversor",
        "type": "address"
      }
    ],
    "name": "InversorBorrado",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "idProyecto",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "cuentaInversor",
        "type": "address"
      }
    ],
    "name": "ProyectoInversorBorrado",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_cuentaPromotor",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_idProyecto",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "_nombre",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "_fechaInicioFinanciacion",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_fechaFinFinanciacion",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_tokensGoal",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_rentabilidad",
        "type": "uint256"
      }
    ],
    "name": "ProyectoRegistrado",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "ProyectoBorrado",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "ProyectoEnEjecucion",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "ProyectoFinalizado",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "ProyectoEjecutado",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_idProyecto",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "_estadoProyecto",
        "type": "uint8"
      }
    ],
    "name": "ProjectStatusIncorrecto",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_cuentaPromotor",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "ProyectoGoalNoAlcanzado",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "nombre",
        "type": "string"
      },
      {
        "name": "cif",
        "type": "string"
      },
      {
        "name": "capacidad",
        "type": "uint256"
      }
    ],
    "name": "registrarPromotor",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "finalizarProyecto",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "cancelarProyecto",
    "outputs": [],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "cuentaInversor",
        "type": "address"
      },
      {
        "name": "numeroTokens",
        "type": "uint256"
      }
    ],
    "name": "transferirTokensParaInversor",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "cuentaPromotor",
        "type": "address"
      },
      {
        "name": "numeroTokens",
        "type": "uint256"
      }
    ],
    "name": "transferirTokensParaPromotor",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "cuentaPromotor",
        "type": "address"
      },
      {
        "name": "idProyecto",
        "type": "bytes32"
      },
      {
        "name": "numeroTokens",
        "type": "uint256"
      }
    ],
    "name": "invertirProyecto",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "cuentaPromotor",
        "type": "address"
      },
      {
        "name": "idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "abandonarProyecto",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "cuentaInversor",
        "type": "address"
      },
      {
        "name": "idProyecto",
        "type": "bytes32"
      },
      {
        "name": "numeroTokens",
        "type": "uint256"
      }
    ],
    "name": "devolverTokensInversor",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isOwner",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "currentOwner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_cuentaPromotor",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_idProyecto",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "_nombre",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "_fechaInicioFinanciacion",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_fechaFinFinanciacion",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_tokensGoal",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "_rentabilidad",
        "type": "uint256"
      }
    ],
    "name": "ProyectoRegistrado",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "ProyectoBorrado",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "ProyectoEnEjecucion",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "ProyectoFinalizado",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "ProyectoEjecutado",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_idProyecto",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "_estadoProyecto",
        "type": "uint8"
      }
    ],
    "name": "ProjectStatusIncorrecto",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_cuentaPromotor",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "ProyectoGoalNoAlcanzado",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "idProyecto",
        "type": "bytes32"
      },
      {
        "name": "nombre",
        "type": "string"
      },
      {
        "name": "fechaInicioFinanciacion",
        "type": "uint256"
      },
      {
        "name": "fechaFinFinanciacion",
        "type": "uint256"
      },
      {
        "name": "fechaInicioEjecucion",
        "type": "uint256"
      },
      {
        "name": "fechaFinEjecucion",
        "type": "uint256"
      },
      {
        "name": "tokensGoal",
        "type": "uint256"
      },
      {
        "name": "rentabilidad",
        "type": "uint256"
      }
    ],
    "name": "registrarProyecto",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "cuentaPromotor",
        "type": "address"
      }
    ],
    "name": "consultarPromotor",
    "outputs": [
      {
        "name": "nombre",
        "type": "string"
      },
      {
        "name": "cif",
        "type": "string"
      },
      {
        "name": "capacidad",
        "type": "uint256"
      },
      {
        "name": "listadoProyectos",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "consultarProyecto",
    "outputs": [
      {
        "name": "nombre",
        "type": "string"
      },
      {
        "name": "fechaInicioFinanciacion",
        "type": "uint256"
      },
      {
        "name": "fechaFinFinanciacion",
        "type": "uint256"
      },
      {
        "name": "fechaInicioEjecucion",
        "type": "uint256"
      },
      {
        "name": "fechaFinEjecucion",
        "type": "uint256"
      },
      {
        "name": "tokensGoal",
        "type": "uint256"
      },
      {
        "name": "rentabilidad",
        "type": "uint256"
      },
      {
        "name": "estadoProyecto",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "consultarTokensInvertidosEnProyecto",
    "outputs": [
      {
        "name": "tokensInvertidos",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "listarProyectos",
    "outputs": [
      {
        "name": "_proyectos",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "listarPromotoress",
    "outputs": [
      {
        "name": "_promotores",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "cuentaPromotor",
        "type": "address"
      },
      {
        "name": "idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "listarInversoresProyecto",
    "outputs": [
      {
        "name": "_inversores",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "idProyecto",
        "type": "bytes32"
      },
      {
        "name": "cuentaInversor",
        "type": "address"
      }
    ],
    "name": "listarTokensPorProyectosPorInversor",
    "outputs": [
      {
        "name": "tokensInversor",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "deleteProyecto",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "idProyecto",
        "type": "bytes32"
      },
      {
        "name": "_status",
        "type": "uint8"
      }
    ],
    "name": "esEstadoProyectoValido",
    "outputs": [
      {
        "name": "_estadoProyecto",
        "type": "uint8"
      },
      {
        "name": "_esValido",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "idProyecto",
        "type": "bytes32"
      }
    ],
    "name": "ejecutarProyecto",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "account",
        "type": "address"
      },
      {
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];