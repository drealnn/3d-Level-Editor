var h;
function setUpGui()
{
    // gui
                
    var gui = new dat.GUI();
    h = gui.addFolder("Blocks");

    h.add(color, 'brick').listen().onChange(function(value) {falsifyColors('brick')});
    h.add(color, 'wood').listen().onChange(function(value) {falsifyColors('wood')});
    //addColorPropertyToGui();

    //color.red = false;



    gui.domElement.id = 'gui';
}

function falsifyColors(mycolor)
{
    for (property in color)
    {
        if (property == mycolor)
        {
            color[property] = true;
            currBlockType = property;
            continue;
        }


        color[property] = false;
    }
}

function addColorPropertyToGui()
{
    for (property in color)
    {
        if (color.hasOwnProperty(property) )
        {
            h.add(color, property).listen().onChange(function(value) {falsifyColors(property.toString)} );
        }
    }
}
