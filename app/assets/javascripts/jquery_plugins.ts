interface JQuery
{
    throwIfEmpty() : JQuery;
}

$.fn.throwIfEmpty = function()
{
    if( this.length == 0 )
    {
        throw 'No matched elements'
    }
    return this;
}