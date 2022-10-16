const {db} = require ("../cnn");

//Consultas
const getEditorial=async(req,res)=>{
    const consulta = "SELECT * FROM editorial";
    const response = await db.query(consulta);
    res.status(200).json(response);
    console.log(response);
}
const postEditorial=async(req,res)=>{
    const consulta = "INSERT INTO editorial values ($1,$2,$3,$4) returning*;"
    try {
        const editorial = req.body;
        const response = await db.one(consulta,[
            editorial.edi_id,
            editorial.edi_nombre,
            editorial.edi_pais,
            editorial.edi_ciudad
        ])
        res.status(200).json({
            message:"Editorial ingresada correctamente",
            body:response
        });
    } catch (e) {
        res.status(400).json({
            code:e.code,
            message:e.message
        });
    }
}

const putEditorial=async(req,res)=>{
    const consulta = "UPDATE editorial SET edi_nombre=$2,edi_pais=$3,edi_ciudad=$4 WHERE edi_id=$1"+
    " RETURNING*;";
    try {
        const editorial= req.body;
        const response= await db.one(consulta,[
            editorial.edi_id,
            editorial.edi_nombre,
            editorial.edi_pais,
            editorial.edi_ciudad
        ]);
        res.status(200).json({
            message:"La editorial con id "+editorial.edi_id+" ha sido actualizada.",
            body:response
        });
    } catch (e) {
        res.status(400).json({
            code:e.code,
            message:e.message
        });
    }
}

const deleteEditorial=async(req, res)=>{
    const consulta= "DELETE FROM editorial WHERE edi_id=$1;";
    try {
        const edi_id=req.params.edi_id;
        const response= await db.query(consulta,[edi_id]);
        res.status(200).json({
            message:"La editorial con id de editorial se ha borrado."
        });
        console.log(req.params.edi_id);
    } catch (e) {
        res.status(400).json({
            code:e,
            message:"No se ha encontrado una editorial con id "+req.params.edi_id
        });
    }
}

module.exports={
    getEditorial,postEditorial,putEditorial,deleteEditorial
}