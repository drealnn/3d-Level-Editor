var h;
var color = {'brick': true, 'ground':false, 'wood':false, 'stone':false, 'spawn': false};
function setUpGui()
{
    // gui
                
    var gui = new dat.GUI();
    h = gui.addFolder("Blocks");

    h.add(color, 'brick').listen().onChange(function(value) {falsifyColors('brick'); currBlockType = 0;});
    h.add(color, 'ground').listen().onChange(function(value) {falsifyColors('ground'); currBlockType = 1;});
    h.add(color, 'wood').listen().onChange(function(value) {falsifyColors('wood'); currBlockType = 2;});
    h.add(color, 'stone').listen().onChange(function(value) {falsifyColors('stone'); currBlockType = 3;});
    
    gui.add(color, 'spawn').listen().onChange(function(value) {falsifyColors('spawn'); currBlockType = 4;});
    
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
