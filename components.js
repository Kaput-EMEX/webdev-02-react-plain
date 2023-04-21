const { useState, useEffect } = React;
const { WidthProvider, Responsive } = ReactGridLayout;

function removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

    if (objWithIdIndex > -1) {
        arr.splice(objWithIdIndex, 1);
    }

    return arr;
}

function toggleObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

    arr[objWithIdIndex].selected = !arr[objWithIdIndex].selected;

    return arr;
}

function getNestedValue(path, object) {
    let result = object;
    for (let point of path) {
        result = result[point];
    }

    return result;
}

const ResponsiveGridLayout = WidthProvider(Responsive);

const itemOptions = [
    {
        id: 1,
        title: "Applicants", selected: false,
        width: 2, height: 2,
        content: function () {
            return (
                <Items
                    GET={fetchApplicants} POST={postApplicant} DELETE={deleteApplicant} PATCH={patchApplicant}
                    columns={[
                        { name: "Name", key: ["name"] },
                        { name: "Email", key: ["email"] },
                        { name: "Resume", key: ["resume"] }
                    ]}
                    getRequiredFields={getApplicantRequiredFields}
                    fields={[
                        { label: "Name", key: ["name"], type: "text" },
                        { label: "Email", key: ["email"], type: "text" },
                        { label: "Resume", key: ["resume"], type: "text" },
                        { label: "Skills", key: ["skills"], type: "array" }
                    ]}
                    otherFields={[
                        { label: "Applications", key: ["applications", "text"], type: "object-array" }
                    ]}
                    createFields={[
                        { label: "Name", key: ["name"], type: "text" },
                        { label: "Email", key: ["email"], type: "text" },
                        { label: "Resume", key: ["resume"], type: "text" },
                        { label: "Skills", key: ["skills"], type: "array" }
                    ]}
                />)
        }
    },
    {
        id: 2,
        title: "Applications", selected: false,
        width: 2, height: 2,
        content: function () {
            return (
                <Items
                    GET={fetchApplications} POST={postApplication} DELETE={deleteApplication} PATCH={patchApplication}
                    columns={[
                        { name: "Job", key: ["job", "description"] },
                        { name: "Text", key: ["text"] },
                        { name: "Applicant", key: ["applicant", "name"] }
                    ]}
                    getRequiredFields={getApplicationRequiredFields}
                    fields={[
                        { label: "Text", key: ["text"], type: "text" }
                    ]}
                    otherFields={[
                        { label: "Applicant", key: ["applicant", "name"], type: "text" },
                        { label: "Job", key: ["job", "description"], type: "textarea" }
                    ]}
                    createFields={[
                        { label: "Text", key: ["text"], type: "textarea" },
                        { label: "Job", key: ["job"], type: "text" },
                        { label: "Applicant", key: ["applicant"], type: "text" }
                    ]}
                />)
        }
    },
    {
        id: 3,
        title: "Companies", selected: false,
        width: 2, height: 2,
        content: function () {
            return (
                <Items
                    GET={fetchCompanies} POST={postCompany} DELETE={deleteCompany} PATCH={patchCompany}
                    columns={[
                        { name: "Company", key: ["name"] },
                        { name: "Industry", key: ["industry"] },
                        { name: "Description", key: ["description"] }
                    ]}
                    getRequiredFields={getCompanyRequiredFields}
                    fields={[
                        { label: "Name", key: ["name"], type: "text" },
                        { label: "Industry", key: ["industry"], type: "text" },
                        { label: "Description", key: ["description"], type: "textarea" },
                        { label: "Size", key: ["size"], type: "number" }
                    ]}
                    otherFields={[
                        { label: "Jobs", key: ["jobs", "description"], type: "object-array" },
                        { label: "Reviews", key: ["reviews", "text"], type: "object-array" },
                        { label: "Employees", key: ["employees", "name"], type: "object-array" }
                    ]}
                    createFields={[
                        { label: "Name", key: ["name"], type: "text" },
                        { label: "Industry", key: ["industry"], type: "text" },
                        { label: "Description", key: ["description"], type: "textarea" },
                        { label: "Size", key: ["size"], type: "number" }
                    ]}
                />)
        }
    },
    {
        id: 4,
        title: "Employees", selected: false,
        width: 2, height: 2,
        content: function () {
            return (
                <Items
                    GET={fetchEmployees} POST={postEmployee} DELETE={deleteEmployee} PATCH={patchEmployee}
                    columns={[
                        { name: "Name", key: ["name"] },
                        { name: "Email", key: ["email"] },
                        { name: "Role", key: ["role"] },
                        { name: "Company", key: ["company", "name"] }
                    ]}
                    getRequiredFields={getEmployeeRequiredFields}
                    fields={[
                        { label: "Name", key: ["name"], type: "text" },
                        { label: "Email", key: ["email"], type: "text" },
                        { label: "Role", key: ["role"], type: "text" }
                    ]}
                    otherFields={[
                        { label: "Company", key: ["company", "name"], type: "text" }
                    ]}
                    createFields={[
                        { label: "Name", key: ["name"], type: "text" },
                        { label: "Email", key: ["email"], type: "text" },
                        { label: "Role", key: ["role"], type: "text" },
                        { label: "Company", key: ["company"], type: "text" }
                    ]}
                />)
        }
    },
    {
        id: 5,
        title: "Recruiters", selected: false,
        width: 2, height: 2,
        content: function () {
            return (
                <Items
                    GET={fetchRecruiters} POST={postRecruiter} DELETE={deleteRecruiter} PATCH={patchRecruiter}
                    columns={[
                        { name: "Name", key: ["name"] },
                        { name: "Email", key: ["email"] },
                        { name: "Company", key: ["company", "name"] }
                    ]}
                    getRequiredFields={getRecruiterRequiredFields}
                    fields={[
                        { label: "Name", key: ["name"], type: "text" },
                        { label: "Email", key: ["email"], type: "text" }
                    ]}
                    otherFields={[
                        { label: "Company", key: ["company", "name"], type: "text" },
                        { label: "Jobs", key: ["jobs", "description"], type: "object-array" }
                    ]}
                    createFields={[
                        { label: "Name", key: ["name"], type: "text" },
                        { label: "Email", key: ["email"], type: "text" },
                        { label: "Company", key: ["company"], type: "text" }
                    ]}
                />)
        }
    },
    {
        id: 6,
        title: "Reviews", selected: false,
        width: 2, height: 2,
        content: function () {
            return (
                <Items
                    GET={fetchReviews} POST={postReview} DELETE={deleteReview} PATCH={patchReview}
                    columns={[
                        { name: "Company", key: ["company", "name"] },
                        { name: "Score", key: ["score"] },
                        { name: "Text", key: ["text"] }
                    ]}
                    getRequiredFields={getReviewsRequiredFields}
                    fields={[
                        { label: "Text", key: ["text"], type: "textarea" },
                        { label: "Score", key: ["score"], type: "number" }
                    ]}
                    otherFields={[
                        { label: "Company", key: ["company", "name"], type: "text" },
                    ]}
                    createFields={[
                        { label: "Text", key: ["text"], type: "textarea" },
                        { label: "Score", key: ["score"], type: "number" },
                        { label: "Company", key: ["company"], type: "text" },
                        { label: "Employee", key: ["employee"], type: "text" }
                    ]}
                />)
        }
    },
];

var activeItems = []

const Sidebar = function ({ addItem, removeItem }) {
    // Define an array of item options with a 'selected' property

    const handleSelectItem = (item) => {
        // Toggle the 'selected' property of the selected item
        if (!item.selected) {
            addItem(item);
        }
        else {
            removeItem(item.id);
            removeObjectWithId(activeItems, item.id);
            console.log(activeItems)
        }

        // toggleObjectWithId(itemOptions, item.id);
    };

    return (
        <div id="sidebar" className="vbox-compact">
            <h2>Add Item:</h2>
            {itemOptions.map((item, index) => (
                <div key={index} onClick={() => handleSelectItem(item)}>
                    <span class="sidebar-item" data-selected={item.selected ? "true" : "false"}>{item.title}</span></div>
            ))}
        </div>
    );
};

const Items = function ({ GET, POST, DELETE, PATCH, columns, getRequiredFields, fields, otherFields, createFields }) {
    // https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook
    const [items, setItems] = useState([]);
    const [selectedIx, setSelectedIx] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filterText, setFilterText] = useState("");
    const [view, setView] = useState("table");
    const [requiredFields, setRequiredFields] = useState([]);

    useEffect(() => {
        GET({ cache: "no-store" }).then((items) => {
            setItems(items);
            getRequiredFields({ cache: "no-store" }).then((fields) => {
                setRequiredFields(fields)
            });
            setLoading(false);
        });
    }, []);

    const onFilterChange = (event) => {
        setFilterText(event.target.value);
    };

    const onRowClick = (index) => {
        if (index === selectedIx) setSelectedIx(null);
        else setSelectedIx(index);
    };

    const changeView = (view) => {
        setView(view);
    };

    const reloadItems = async () => {
        setLoading(true);
        setSelectedIx(null);
        await GET({ cache: "no-store" }).then((items) => {
            setItems(items);
        });
        setLoading(false);
    };

    const postItem = async (item) => {
        setLoading(true);
        await POST(item);
        setLoading(false);
        reloadItems();
    };

    const deleteItem = async (item) => {
        setLoading(true);
        await DELETE(item);
        setLoading(false);
        reloadItems();
    };

    const patchItem = async (item) => {
        var oldIx = selectedIx;
        setLoading(true);
        await PATCH(item);
        setLoading(false);
        reloadItems();
        setSelectedIx(oldIx);
    };

    if (loading) {
        return (<div><p>Loading...</p></div>);
    }

    else if (items === undefined) {
        return (<div><p>Server/Api Error</p></div>);
    }

    if (view === "table") {
        return (
            <Table
                data={items}
                columns={columns}
                selected={selectedIx}
                onRowClick={onRowClick}
                reload={reloadItems}
                remove={deleteItem}
                changeView={changeView}
                onFilterChange={onFilterChange}
                filterText={filterText}
            />
        );
    }

    if (view === "item") {
        return (
            <ItemView
                item={items[selectedIx]}
                fields={fields}
                otherFields={otherFields}
                changeView={changeView}
                reloadTable={reloadItems}
                update={patchItem}
            />
        );
    }

    if (view === "create") {
        return (
            <ItemCreate
                fields={createFields}
                requiredFields={requiredFields}
                changeView={changeView}
                reloadTable={reloadItems}
                create={postItem}
            />
        );
    }
}


const Table = function ({ data, columns, selected, onRowClick, reload, remove, changeView, filterText, onFilterChange }) {
    return (
        <div class="hfill">
            <div class="hbox-compact hfill dir-center buttons-bar">
                <input type="search" class="" value={filterText} placeholder="Filter..." onChange={onFilterChange} />
                <button onClick={reload}>Reload</button>
                <button onClick={() => { remove(data[selected]) }}>Delete</button>
                <button onClick={() => { if (selected !== null) changeView("item") }}>View/Edit</button>
                <button onClick={() => { changeView("create") }}>New</button>
            </div>
            <br />
            <br />
            <table class="datatable">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr onClick={() => onRowClick(index)} data-selected={selected == index} key={index}>
                            {columns.map((column, index) => (
                                <td key={index}>{getNestedValue(column.key, item)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                </tfoot>
            </table>
        </div>
    );
};

const ItemView = ({ item, fields, otherFields, changeView, reloadTable, update }) => {
    const [viewItem, setViewItem] = useState(item);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setViewItem((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleArrayChange = (event, index) => {
        const { name, value } = event.target;
        setViewItem((prevState) => {
            const newValue = [...prevState[name]];
            newValue[index] = value;
            return {
                ...prevState,
                [name]: newValue,
            };
        });
    };

    const handleAddElement = (name) => {
        setViewItem((prevState) => {
            const newValue = [...prevState[name], ""];
            return {
                ...prevState,
                [name]: newValue,
            };
        });
    };

    const handleDeleteElement = (name, index) => {
        setViewItem((prevState) => {
            const newValue = [...prevState[name]];
            newValue.splice(index, 1);
            return {
                ...prevState,
                [name]: newValue,
            };
        });
    };

    return (
        <div className="hfill">
            <div className="hbox-compact hfill dir-center buttons-bar">
                <button onClick={() => { reloadTable(); changeView("table") }}>
                    Close
                </button>
                <button onClick={() => { update(viewItem) }}>Update</button>
            </div>
            <br />
            <br />
            <h3>Editable:</h3>
            <hr />
            {fields.map((field) => (
                <div>
                    <div className="acc-text">{field.label}:</div>
                    {field.type === "text" && (
                        <input
                            name={field.key[0]}
                            className="data-container hfill"
                            value={getNestedValue(field.key, viewItem)}
                            onChange={handleInputChange}
                        />
                    )}
                    {field.type === "textarea" && (
                        <textarea
                            name={field.key[0]}
                            className="data-container hfill"
                            value={getNestedValue(field.key, viewItem)}
                            onChange={handleInputChange}
                        />
                    )}
                    {field.type === "number" && (
                        <input
                            name={field.key[0]}
                            type="number"
                            className="data-container hfill"
                            value={getNestedValue(field.key, viewItem)}
                            onChange={handleInputChange}
                        />
                    )}
                    {field.type === "array" && (
                        <div>
                            {getNestedValue(field.key, viewItem).map((value, index) => (
                                <div key={index} className="hbox">
                                    <button className="list-button" onClick={() => handleDeleteElement(field.key[0], index)}>x</button>
                                    <input
                                        name={field.key[0]}
                                        className="data-container hfill"
                                        value={value}
                                        onChange={(event) => handleArrayChange(event, index)}
                                    />
                                    <br />
                                    <br />
                                </div>
                            ))}
                            <button className="list-button" onClick={() => handleAddElement(field.key[0])}>+</button>
                        </div>
                    )}
                    <br />
                    <br />
                </div>
            ))}
            <h3>Static:</h3>
            <hr />
            {otherFields.map((field) => (
                <div>
                    <div className="acc-text">{field.label}:</div>
                    {(field.type === "text" || field.type === "number") && (
                        <span
                            name={field.key[0]}
                            className="data-container hfill"
                        >
                            {getNestedValue(field.key, viewItem)}
                        </span>
                    )}
                    {field.type === "textarea" && (
                        <p
                            name={field.key[0]}
                            className="data-container hfill"
                            value={getNestedValue(field.key, viewItem)}
                        >
                            {getNestedValue(field.key, viewItem)}
                        </p>
                    )}
                    {field.type === "array" && (
                        <div>
                            {getNestedValue(field.key, viewItem).map((value, index) => (
                                <div key={index} className="hbox">
                                    <span
                                        name={field.key[0]}
                                        className="data-container hfill"
                                    >
                                        {value}
                                    </span>
                                    <br />
                                    <br />
                                </div>
                            ))}
                        </div>
                    )}
                    {field.type === "object-array" && (
                        <div>
                            {getNestedValue(field.key.slice(0, -1), viewItem).map((object, index) => (
                                <div key={index} className="hbox">
                                    <p
                                        name={field.key[0]}
                                        className="data-container hfill"
                                    >
                                        {object[field.key[field.key.length - 1]]}
                                    </p>
                                    <br />
                                    <br />
                                </div>
                            ))}
                        </div>
                    )}
                    <br />
                    <br />
                </div>
            ))}
        </div>
    );
};


const ItemCreate = ({ fields, requiredFields, changeView, reloadTable, create }) => {
    const [viewItem, setViewItem] = useState({});
    const [canCreate, setCanCreate] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setViewItem((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleArrayChange = (event, index) => {
        const { name, value } = event.target;
        setViewItem((prevState) => {
            const newValue = [...prevState[name]];
            newValue[index] = value;
            return {
                ...prevState,
                [name]: newValue,
            };
        });
    };

    const handleAddElement = (name) => {
        setViewItem((prevState) => {
            const newValue = [...prevState[name], ""];
            return {
                ...prevState,
                [name]: newValue,
            };
        });
    };

    const handleDeleteElement = (name, index) => {
        setViewItem((prevState) => {
            const newValue = [...prevState[name]];
            newValue.splice(index, 1);
            return {
                ...prevState,
                [name]: newValue,
            };
        });
    };

    useEffect(() => {
        let canCreateValue = true;
        for (let i = 0; i < requiredFields.length; i++) {
            const field = requiredFields[i];
            if (!viewItem[field]) {
                canCreateValue = false;
                break;
            }
        }
        setCanCreate(canCreateValue);
    }, [viewItem]);


    return (
        <div className="hfill">
            <div className="hbox-compact hfill dir-center buttons-bar">
                <button onClick={() => { reloadTable(); changeView("table") }}>
                    Close
                </button>
                <button onClick={() => { create(viewItem) }} disabled={!canCreate}>Create</button>
            </div>
            <br />
            <br />
            <h3>Editable:</h3>
            <hr />
            {fields.map((field) => (
                <div>
                    <div className="acc-text">
                        {field.label}:
                        {requiredFields.includes(field.key[0]) && (
                            <span className=""> (required)</span>
                        )}
                    </div>
                    {field.type === "text" && (
                        <input
                            name={field.key[0]}
                            className="data-container hfill"
                            value={getNestedValue(field.key, viewItem)}
                            onChange={handleInputChange}
                        />
                    )}
                    {field.type === "textarea" && (
                        <textarea
                            name={field.key[0]}
                            className="data-container hfill"
                            value={getNestedValue(field.key, viewItem)}
                            onChange={handleInputChange}
                        />
                    )}
                    {field.type === "number" && (
                        <input
                            name={field.key[0]}
                            type="number"
                            className="data-container hfill"
                            value={getNestedValue(field.key, viewItem)}
                            onChange={handleInputChange}
                        />
                    )}
                    {field.type === "array" && (
                        <div>
                            {getNestedValue(field.key, viewItem).map((value, index) => (
                                <div key={index} className="hbox">
                                    <button className="list-button" onClick={() => handleDeleteElement(field.key[0], index)}>x</button>
                                    <input
                                        name={field.key[0]}
                                        className="data-container hfill"
                                        value={value}
                                        onChange={(event) => handleArrayChange(event, index)}
                                    />
                                    <br />
                                    <br />
                                </div>
                            ))}
                            <button className="list-button" onClick={() => handleAddElement(field.key[0])}>+</button>
                        </div>
                    )}
                    <br />
                    <br />
                </div>
            ))}
        </div>
    );
};

