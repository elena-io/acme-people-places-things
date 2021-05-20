const express = require('express');
const { syncAndSeed, models: {Person, Thing, Place} } = require('./db');

const app = express();

app.get('/', async(req, res, next) => {
    try {
        const [people, things, places] = await Promise.all([
            Person.findAll(),
            Place.findAll(),
            Thing.findAll()
        ])
        
        res.send( 
            `
            <html>
                <head>
                    <h1> PPT </h1>
                </head>
                <h2> People </h2>
                    <ul>
                    ${
                        people.map( person => 
                            `
                            <li>
                                ${ person.name }
                            </li>
                            `
                        ).join('')
                    }
                    </ul>
                <h2> Places </h2>
                    <ul>
                    ${
                        places.map( place => 
                            `
                            <li>
                                ${ place.name }
                            </li>
                            `
                        ).join('')
                    }
                    </ul>
                <h2> Things </h2>
                <ul>

                ${
                    things.map( thing => 
                        `
                        <li>
                            ${ thing.name }
                        </li>
                        `
                    ).join('')
                }
                </ul>



            </html>
            `



        )

    }
    catch(ex) {
        console.log(ex);
    }
})


const init = async() => {
    try{
        await syncAndSeed();
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`listening on port ${port}`))
    }
    catch(ex) {
        console.log(ex);
    }
}

init();





