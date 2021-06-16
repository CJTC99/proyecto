const express = require('express');
const router = express.Router();
const pool = require('../database');

//RUTAS PARA LAS LISTAS DE TAREAS
router.get('/add', (req, res) => {
    res.render('homework/add.hbs');
});

router.post('/add', async(req, res) =>{

    const { title, description } = req.body;   

    const newHomework = {

        title,
        description

    };

    await pool.query('INSERT INTO tareas set ?', [newHomework]);
    req.flash('success', 'Tarea agregada correctamente');
    return res.redirect('/homework'); //originalmente es sin el return, pero en nuestras computadoras, solo agarraba usando el 'RETURN'
   
    res.send('recibido uwu');

});

router.get('/', async(req, res) => {

    const tareas = await  pool.query('SELECT * FROM tareas');
    //console.log(tareas);
    res.render('homework/list.hbs', {tareas: tareas} );

});

router.get('/delete/:id', async(req, res) => {

    //console.log(req.params.id);
    //res.send('eliminado :c ');
    const { id } = req.params;
    await pool.query('DELETE FROM tareas WHERE id =?', [id]);
    req.flash('success', 'La tarea ha sido eliminada satisfactoriamente');
    return res.redirect('/homework');

});

router.get('/edit/:id', async(req, res) =>{

    const { id } = req.params;
    const tareas = await pool.query('SELECT * FROM tareas WHERE id = ?', [id]);
    
    res.render('homework/edit.hbs', {tarea: tareas[0]} );
    //console.log(tareas);
   
    //console.log(id);
   // res.send('Editado -w-');

});

router.post('/edit/:id', async(req, res) => {

    const { id } = req.params;
    const {title, description } = req.body;

    const newHomework = {

        title,
        description
    };

   await pool.query('UPDATE tareas set ? WHERE id =?', [newHomework, id]);
   req.flash('success', 'La tarea ha sido actualizada satisfactoriamente');
   return res.redirect('/homework');


});



module.exports = router;