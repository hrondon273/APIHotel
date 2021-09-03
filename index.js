module.exports = () =>{
    const data ={
        hoteles: []
    }
    const totalHoteles=20
    for (let i = 0; i < totalHoteles; i++) {
        data.hoteles.push({
            id: i,
            nombre:  `nombre${i}`,
            descripcion: `descripcion ${i}`,
            direccion: `direccion ${i}`,
            telefono: `telefono ${i}`,
            servicios: `servicios ${i}`,
            familiar:`familiar ${i}`
        });
        
    }
    return data;
}
