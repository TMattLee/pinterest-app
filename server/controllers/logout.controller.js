module.exports = {
  logout: ( req, res ) => {
    if( req.session ){
      req.session.destroy( ( error ) => {
        if ( error ) console.log( error );
        res.send('SIGNED_OUT');
      });
    }
  } 
}