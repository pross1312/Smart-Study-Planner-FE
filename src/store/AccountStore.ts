export type AccountInfo = {
    user_id: string;
    name?: string;
};

export type AccountState = {
    accountInfo: AccountInfo | null;
    token: string | null;
};

export const saveAccountToLocalStorage = (account: AccountInfo) => {
    localStorage.setItem("accountInfo", JSON.stringify(account));
};

export const getAccountFromLocalStorage = (): AccountInfo | null => {
    const accountData = localStorage.getItem("accountInfo");
    return accountData ? JSON.parse(accountData) : null;
};

export const clearAccountFromLocalStorage = () => {
    localStorage.removeItem("accountInfo");
};
