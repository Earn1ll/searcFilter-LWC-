public with sharing class contactsController {
    @AuraEnabled(cacheable=true)

public static List<Contact> getContacts() {
    return [
        SELECT Id, FirstName, LastName, Phone, Email, Account.Name,AccountId, CreatedDate
        FROM Contact LIMIT 10
    ];

}
@AuraEnabled(cacheable=true)
public static List<Contact> getContactsSearch( String searchkey) {
    string searchKeyword = '%' + searchkey + '%';
    return [
        SELECT Id, FirstName, LastName, Phone, Email, Account.Name,AccountId, CreatedDate
        FROM Contact where Name LIKE :searchKeyword LIMIT 10
    ];
}
}