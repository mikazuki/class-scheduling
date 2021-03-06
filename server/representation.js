/*********************************************
 * Class Scheduling 
 * Representation Service
 * January 2013
 * Mike Amundsen (@mamund)
 * http://www.infoq.com/author/Mike-Amundsen
 * http://www.linkedin.com/in/mikeamundsen
 ********************************************/

module.exports = processCSDoc;

function processCSDoc(object) {
    var doc, i, x, tmp, coll;

    doc = '';
    doc += '<?xml-stylesheet type="text/xsl" href="/file/browser.xsl" ?>';
    doc += '<root>';

    // handle action element
    if(object && object.action) {
        doc += actionElement(object.action);
    }

    // handle link collection
    if(object && object.links) {
        doc += '<links>';
        coll = object.links;
        for(i=0, x=coll.length; i<x; i++) {
            doc += linkElement(coll[i]);
        }
        doc += '</links>';
    }

    // handle lists
    if(object && object.list) {
        for(i=0,x=object.list.length; i<x;i++) {
            doc += listElement(object.list[i]);
        }
    }

    // handle error
    if(object && object.error) {
        doc += '<error>';
        coll = object.error.data;
        for(i=0, x=coll.length; i<x; i++) {
            doc += dataElement(coll[i]);
        }
        doc += '</error>';
    }
    doc += '</root>';

    return doc;
}

function listElement(elm) {
    var i, x, rtn;

    rtn ='<list ';
    if(elm.name) {
        rtn += 'name="'+elm.name+'" ';
    }
    rtn += '>';

    if(elm.action) {
        rtn += actionElement(elm.action);
    }

    if(elm.item) { 
        for(i=0, x=elm.item.length; i<x; i++) {
            rtn += itemElement(elm.item[i]);
        }
    }
    rtn += '</list>';

    return rtn;
}

function itemElement(elm) {
    var coll, i, x, rtn;

    rtn = '<item ';
    if(elm.name) {
        rtn += 'name="'+elm.name+'" ';
    }
    rtn += '>';

    if(elm.display) {
        rtn += displayElement(elm.display);
    }

    if(elm.action) {
        rtn += actionElement(elm.action);
    }
    rtn += '</item>';

    return rtn;
}

function displayElement(elm) {
    var i, x, rtn;

    rtn = '<display>';

    if(elm.data) {
        for(i=0,x=elm.data.length; i<x; i++) {
            rtn += dataElement(elm.data[i]);
        }
    }
    rtn += '</display>';

    return rtn;
}

function actionElement(elm) {
    var i, x, rtn;

    rtn = '<actions>';

    if(elm.template) {
        for(i=0, x=elm.template.length; i<x; i++) {
            rtn += templateElement(elm.template[i]);
        }
    }
    
    if(elm.link) {
        for(i=0, x=elm.link.length; i<x; i++) {
            rtn += linkElement(elm.link[i]);
        }
    }

    rtn += '</actions>';

    return rtn;
}

function templateElement(elm) {
    var i, x, rtn;

    rtn = '<template ';
    if(elm.name) {
        rtn += 'name="'+elm.name+'" ';
    }
    if(elm.href) {
        rtn += 'href="'+elm.href+'" ';
    }
    if(elm.action) {
        rtn += 'action="'+elm.action+'" '
    }
    if(elm.prompt) {
        rtn += 'prompt="'+elm.prompt+'" '
    }
    rtn += '>';

    if(elm.data) {
        for(i=0, x=elm.data.length; i<x; i++) {
            rtn += dataElement(elm.data[i]);
        }
    }
    rtn += '</template>';

    return rtn;
}

function linkElement(elm) {
    var rtn;

    rtn = '<link ';
    if(elm.name) {
        rtn += 'name="'+elm.name+'" ';
    }
    if(elm.href) {
        rtn += 'href="'+elm.href+'" ';
    }
    if(elm.action) {
        rtn += 'action="'+elm.action+'" ';
    }
    if(elm.prompt) {
        rtn += 'prompt="'+elm.prompt+'" ';
    }
    rtn += '/>';

    return rtn;
}

function dataElement(elm) {
    var rtn;
    
    rtn = '<data ';
    if(elm.name) {
        rtn += 'name="'+elm.name+'" ';
    }
    if(elm.prompt) {
        rtn += 'prompt="'+elm.prompt+'" ';
    }
    if(elm.value) {
        rtn += 'value="'+elm.value+'" ';
    }
    if(elm.embed) {
        rtn += 'embed="'+elm.embed+"' ";
    }
    rtn += '/>';

    return rtn;
}

