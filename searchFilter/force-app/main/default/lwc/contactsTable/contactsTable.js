import { LightningElement, wire, track } from 'lwc';
import getContacts from '@salesforce/apex/contactsController.getContacts';
import getContactsSearch from '@salesforce/apex/contactsController.getContactsSearch';

export default class ContactsTable extends LightningElement {
    @track error;
    @track contacts;
columns = [
    { label: 'First Name', fieldName: 'FirstName', type: 'text' },
    { label: 'Last Name', fieldName: 'LastName', type: 'text' },
    { label: 'Email', fieldName: 'Email', type: 'text' },
    { label: 'MOBILE PHONE', fieldName: 'Phone', type: 'phone' },
    { label: "Account",fieldName: 'recordLink',   type: "url",
        typeAttributes: { label: { fieldName: 'AccountName' }, tooltip:'Name', target: '_blank' ,linkify: true},
        sortable: false, hideDefaultActions: true, wrapText: true
    },
    {label: 'CREATED DATE',fieldName: 'CreatedDate', type: 'date', typeAttributes: {
        day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true}
    }
];
searchValue = '';
updateKey(event){
    this.searchValue = event.target.value;
}
handleSearch(){
    getContactsSearch({searchkey: this.searchValue })
    .then(result=>{
        let ObjData = JSON.parse(JSON.stringify(result));
        ObjData.forEach(Record => {
            Record.recordLink = "/" + Record.AccountId;  
            Record.AccountName = Record.Account.Name;
        });
        this.contacts = ObjData;
        console.log(result);
    })
    .catch(error =>{
        this.contacts = null;                
    });
}
@wire(getContacts)
wiredAccounts({error,data}) {
    if (data) {
        let ObjData = JSON.parse(JSON.stringify(data));
        //alert(JSON.stringify(data));
        //console.log(JSON.stringify(data));
        ObjData.forEach(Record => {
            Record.recordLink = "/" + Record.AccountId;  
            Record.AccountName = Record.Account.Name;
        });
        this.contacts = ObjData;
        console.log(ObjData);
    } else if (error) {
        this.error = error;
    }
}
}