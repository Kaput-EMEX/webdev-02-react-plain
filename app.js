console.log("loading golden layout...");
const { useState } = React;
const { WidthProvider, Responsive } = ReactGridLayout;

function removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
  
    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }
  
    return arr;
  }

const ResponsiveGridLayout = WidthProvider(Responsive);

const itemOptions = [
    { id: 1, title: 'Item 1', width: 2, height: 2, content: <p>"hello world"</p>, selected: false },
    { id: 2, title: 'Item 2', width: 2, height: 2, selected: false },
    { id: 3, title: 'Item 3', width: 2, height: 2, selected: false },
    { id: 4, title: 'Item 4', width: 2, height: 2, selected: false },
];

var activeItems = []

const Sidebar = ({ addItem, removeItem }) => {
    // Define an array of item options with a 'selected' property

    const handleSelectItem = (item) => {
        // Toggle the 'selected' property of the selected item
        if(!item.selected) {
            addItem(item);
            activeItems.push(item);
        }
        else {
            removeItem(item.id);
            removeObjectWithId(activeItems, item.id);
            console.log(activeItems)
        }

        item.selected = !item.selected;
        // Pass the updated item to the onItemSelect callback

    };

    return (
        <div id="sidebar" className="vbox-compact">
            <h2>Add Item:</h2>
            {itemOptions.map((item, index) => (
                <div key={index} onClick={() => handleSelectItem(item)}>
                    <span class="sidebar-item" data-selected={item.selected ? "true" : "false"}>{item.title}</span>
                </div>
            ))}
        </div>
    );
};


const App = () => {
    // Define initial state with an array of items
    const [items, setItems] = useState([
    ]);

    // Define a function to add a new item
    const handleAddItem = (item) => {
        setItems([...items, { ...item }]);
    };

    // Define a function to remove an item by ID
    const handleRemoveItem = (id) => {
        // Filter the state array to remove the item with the matching ID
        setItems(items.filter((item) => item.id !== id));
    };

    return (
        <div id="content" class="hbox">
            <Sidebar addItem={handleAddItem} removeItem={handleRemoveItem} />
            <ResponsiveGridLayout
                className="layout"
                style={{ height: '100%' }}
                rowHeight={100}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                isResizable={true}
                verticalCompact={true}
            >
                {items.map((item) => (
                    <div className="window" key={item.id} data-grid={{ w: item.width, h: item.height, x: 0, y: Infinity }} >
                        <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                        <span>{item.title}</span>
                        {item.content}
                    </div>
                ))}
            </ResponsiveGridLayout>
        </div>
    );
};

// Get a reference to the root element in the HTML
const rootElement = document.getElementById("root");

// Render the App component to the root element
ReactDOM.render(<App />, rootElement);