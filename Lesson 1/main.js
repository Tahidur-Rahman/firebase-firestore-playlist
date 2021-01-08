
const cafes = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let person = document.createElement('span');
    let del = document.createElement('div');

    li.setAttribute('data-id',doc.id);
    name.textContent = doc.data().name;
    person.textContent = doc.data().person;
    del.textContent = '✖';

    li.appendChild(name);
    li.appendChild(person);    
    li.appendChild(del);    

    cafes.appendChild(li);
    del.addEventListener('click',e=>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        console.log(id);
        db.collection('cafe').doc(id).delete();
    })
}

// db.collection('cafe').get().then(snapshot =>{
//     snapshot.docs.forEach(doc => renderCafe(doc))
// })

// RealTime data
db.collection('cafe').onSnapshot(snapshot=>{
    let changes =  snapshot.docChanges();
    changes.forEach(change=>{
        if(change.type == 'added'){
            renderCafe(change.doc)
        }else if(change.type == 'removed'){
            let li = cafes.querySelector('[data-id='+change.doc.id+']');
            cafes.removeChild(li);
        }
    })
})
form.addEventListener('submit',addItem);
function addItem(e){
    e.preventDefault();
    db.collection('cafe').add({
        name:form.name.value,
        person:form.person.value
    });
    form.name.value = '';
    form.person.value = '';
}