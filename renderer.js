// console.log(database);

// let db = new database('PanelKiosk');
// let database = new Dexie('PanelKiosk');
// database.version(1).stores({    
//     tracking: '++id, page, timestamp, status, notes'
// });
// database.tracking.add({page : window.location.href, timestamp : Date.now(), status : 'loaded', notes : 'Panel Kiosk'});



// Called when message received from main process
// window.api.receive("fromMain", (data) => {
//     console.log(`Received ${data} from main process`);
// });

// Send a message to the main process
// window.api.send("toMain", {page : window.location.href, timestamp : Date.now(), status : 'loaded', notes : 'Panel Kiosk'});