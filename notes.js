const fs = require('fs')
const myColor = require('chalk')

const loadNotes = (() => {
    try{
        return JSON.parse(fs.readFileSync('notes.json').toString())
    }catch(e){
        return []
    }
})

const saveNotes = ((notes) => {
    fs.writeFileSync('notes.json',JSON.stringify(notes))
})

const addNotes = ((title,body) => {
    const data = loadNotes()
    const dup = data.find((note) => {
        return note.title === title
    })


    if(!dup){
        data.push({
            title: title,
            body: body 
        })
        saveNotes(data)
        console.log(myColor.greenBright.bold.inverse('Note Added!'))
    }
    else{
        console.log(myColor.red.bold.inverse('Title already exists'))
    }
})

const delNote = ((title) => {
    const data = loadNotes()

    const newAr = data.filter((d) => {
        return d.title !== title
    })

    if(newAr.length === data.length){
        console.log(myColor.red.bold.inverse("Note doesn't exist"))
    }
    else{
        saveNotes(newAr)
        console.log(myColor.greenBright.bold.inverse("Note deleted"))
    }

})

const lNotes = () => {
    
    try{
        const data = loadNotes()
        console.log(myColor.blueBright.bold('Your Notes:'))
        data.forEach(element => {
            console.log(element.title)
        });
    }
    catch(e){
        console.log(myColor.red.inverse("You have no notes"))
    }
}

const rNotes = (title) => {
    try{
        const data = loadNotes()
        const found = data.find((element) => {
            return element.title === title
        })

        if(found !== undefined){
            console.log(myColor.yellowBright(found.title))
            console.log(found.body)
        }
        else{
            console.log(myColor.red.inverse('There is no note with title ' + title))
        }
    }
    catch(e){
        console.log(myColor.red.inverse("You have no notes"))
    }
}

module.exports = {
    addNote: addNotes,
    removeNote: delNote,
    listNotes: lNotes,
    readNotes: rNotes
}