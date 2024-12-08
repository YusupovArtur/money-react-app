interface Window {
  pending: {
    transactions: {
      delete: {
        id: string | undefined;
        flags: number;
      };
    };

    wallets: {
      add: {
        id: string | undefined;
        flags: number;
      };
      delete: {
        id: string | undefined;
        flags: number;
      };
      shift: {
        order: string[] | undefined;
        flags: number;
      };
    };

    categories: {
      add: {
        id: string | undefined;
        flags: number;
      };
      delete: {
        id: string | undefined;
        flags: number;
      };
      shift: {
        order: string[] | undefined;
        flags: number;
      };
    };
  };
}
