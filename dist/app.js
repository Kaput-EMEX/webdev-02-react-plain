const { useState } = React;
const { WidthProvider, Responsive } = ReactGridLayout;

const App = () => {
    // Define initial state with an array of items
    const [items, setItems] = useState([
    ]);
    const [draggedWindowId, setDraggedWindowId] = useState(null);

    // Define a function to add a new item
    const handleAddItem = (item) => {
        setItems([...items, { ...item }]);
        activeItems.push(item);
        toggleObjectWithId(itemOptions, item.id);
    };

    // Define a function to remove an item by ID
    const handleRemoveItem = (id) => {
        // Filter the state array to remove the item with the matching ID
        setItems(items.filter((item) => item.id !== id));
        toggleObjectWithId(itemOptions, id);
    };

    return (
        <div id="content" class="hbox">
            <Sidebar addItem={handleAddItem} removeItem={handleRemoveItem} />
            <ResponsiveGridLayout
                className="layout"
                style={{ height: "100%", width: "100%" }}
                rowHeight={100}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 6, md: 6, sm: 6, xs: 6, xxs: 6 }}
                isResizable={true}
                verticalCompact={true}
                draggableHandle=".window-bar"
                draggableCancel=".window-content"
            >
                {items.map((item) => (
                    <div className="window" key={item.id} data-grid={{ w: item.width, h: item.height, x: 0, y: Infinity }}>
                        <div className="window-bar hbox">
                            <span className="window-title">{item.title}</span>
                            <button className="window-close" onClick={() => handleRemoveItem(item.id)}>X</button>
                        </div>
                        <div className="window-content hbox-compact">
                            {item.content()}
                        </div>
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