interface Window {
  pending: {
    transactions: {
      delete: {
        id: string | undefined;
      };
    };

    wallets: {
      add: {
        id: string | undefined;
      };
      delete: {
        id: string | undefined;
      };
      shift: {
        order: string[] | undefined;
      };
    };

    categories: {
      add: {
        id: string | undefined;
      };
      delete: {
        id: string | undefined;
      };
      shift: {
        order: string[] | undefined;
      };
    };
  };
}
