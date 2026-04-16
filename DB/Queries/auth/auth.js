const {sql} = require('../../config');

const test = async()=>{
    await sql.query`
        INSERT INTO TestTable (name, age, email)
        VALUES 
        ('Ahmed', 25, 'ahmed@test.com'),
        ('Mohamed', 30, 'mohamed@test.com'),
        ('Sara', 22, 'sara@test.com');
    `;
}



module.exports = {
    test
}