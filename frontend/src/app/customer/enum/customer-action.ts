export enum ECustomerActions {
    FetchCustomerById = '[Customer] Fetch customer by id',
    FetchAllCustomers = '[Customer] Fetch all customers',

    CreateCustomer = '[Customer] Create customer',
    CreateCustomerCompleted = '[Customer] Create customer completed',

    RemoveCustomer = '[Customer] Remove customer',
    RemoveCustomerCompleted = '[Customer] Remove customer completed',

    UpdateCustomer = '[Customer] Update customer',
    UpdateCustomerCompleted = '[Customer] Update customer completed',

    FetchAllCustomerAccounts = '[Customer Accounts] Fetch all accounts',
    FetchAllCustomerAccountsCompleted = '[Customer Account] Fetch all accounts completed',

    AddAccountToCustomer = '[Account => Customer] Add account to a customer',
    AddAccountToCustomerCompleted = '[Account => Customer] Add account to a customer completed',

    RemoveAccountFromCustomer = '[Account <= Customer] Remove account from a customer',
    RemoveAccountFromCustomerCompleted = '[Account <= Customer] Remove account from a customer completed',
}
