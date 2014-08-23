nfcRing.vcard = {};
nfcRing.vcard.cache = {};

// Search for a contact
nfcRing.vcard.search = function(name){
  $('#vCardResults').html("Loading contacts...");
  var options = new ContactFindOptions();
  options.filter = name;
  options.multiple = true;
  var fields = ["displayName", "name", "emails", "phoneNumbers"];
  navigator.contacts.find(fields, nfcRing.vcard.found, nfcRing.vcard.error, options);
}

// When a contact is found write it to the UI
nfcRing.vcard.found = function(contacts){
  $('#vCardResults').html("");
  console.log(contacts);
  var i = 0;
  $.each(contacts, function(k,person){
    if(person.displayName && person.id){
      if(i < 5){
        $('#vCardResults').append("<div class='contact' id='"+person.id+"'>"+person.displayName+"</div>");
        nfcRing.vcard.cache[person.id] = person;
        i++;
      }
    }
  });
}

// takes in contact card from cordova and builds vcard format
nfcRing.vcard.build = function(contact){
  alert("Built vcard, still need to do functionality to write it");
  console.log("Contact", contact);
  var vcard = 'BEGIN:VCARD\n' +
    'VERSION:2.1\n' +
    'N:'+contact.name.familyName+';'+contact.name.givenName+';;;\n' +
    'FN:'+contact.name.formatted+'\n' +
    'EMAIL;WORK:'+contact.emails[0].value+'\n' +
    'TEL;'+contact.phoneNumbers[0].value+'\n' +
    'END:VCARD';
  console.log("vcard", vcard);
  return vcard;
}

nfcRing.vcard.error = function(e){
  console.error("vCard Error", e);
}