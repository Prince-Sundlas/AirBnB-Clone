class ExpressError extends Error{
    constructor(status,errormsg){
        super();
        this.status = status;
        this.errormsg = errormsg ;
    }
}
module.exports = ExpressError;