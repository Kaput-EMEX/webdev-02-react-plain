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

const ResponsiveGridLayout = WidthProvider(Responsive);

const itemOptions = [
    {
        id: 1,
        title: 'Applicants', selected: false,
        width: 2, height: 2,
        content: function () { return (<Applicants />) }
    },
    {
        id: 2,
        title: 'Companies', selected: false,
        width: 2, height: 2,
        content: function () { return (<Companies />) }
    },
    {
        id: 3,
        title: 'Item 3', selected: false,
        width: 2, height: 2,
        content: function () { return <p>"hello world"</p> }
    },
    {
        id: 4,
        title: 'Item 4', selected: false,
        width: 2, height: 2,
        content: function () { return <p>"hello world"</p> }
    }
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

const Applicants = function () {
    // https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplicants().then((applicants) => {
            setApplicants(applicants);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (<div><p>Loading...</p></div>);
    }

    else if (applicants === undefined) {
        return (<div><p>Server/Api Error</p></div>);
    }

    else if (applicants.length === 0) {
        return (<div><p>Empty</p></div>);
    }

    return (<div><p>{JSON.stringify(applicants)}</p></div>);
};

const CompanyTable = function ({ companies, selectedCompany, handleRowClick, handleReloadClick, changeView, handleInputChange, filterText }) {
    return (
        <div class="hfill">
            <div class="hbox-compact hfill dir-center">
                <input type="search" class="" value={filterText} placeholder="Filter..." onChange={handleInputChange} />
                <button onClick={handleReloadClick}>Reload</button>
                <button onClick={handleReloadClick}>New</button>
                <button onClick={handleReloadClick}>Delete</button>
                <button onClick={() => { if (selectedCompany !== null) changeView("item") }}>View/Edit</button>
            </div>
            <br />
            <br />
            <table class="datatable">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Industry</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company, index) => (
                        <tr onClick={() => handleRowClick(index)} data-selected={selectedCompany == index}>
                            <td>{company.name}</td>
                            <td>{company.industry}</td>
                            <td>{company.description}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                </tfoot>
            </table>
        </div>
    );
};

const CompanyView = function ({ company, changeView, reloadTable }) {
    const [viewCompany, setViewCompany] = useState(company);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setViewCompany(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handlePatchClick = () => {
        setLoading(true);
        patchCompany(viewCompany).then(() => {
            setLoading(false);
            reloadTable();
            changeView("table");
        });
    };

    const handleDeleteClick = () => {
        setLoading(true);
        deleteCompany(viewCompany).then(() => {
            setLoading(false);
            reloadTable();
            changeView("table");
        });
    };

    return (
        <div class="hfill">
            <div class="hbox-compacthandlePostClick-cPostr">
                <button onClick={() => { reloadTable(); changeView("table") }}>Close</button>
                <button onClick={handlePatchClick}>Patch</button>
                <button onClick={handleDeleteClick}>Delete</button>
            </div>
            <br /><br />
            <div class="acc-text">Name:</div>
            <span class="data-container hfill">{viewCompany.name}</span>
            <br /><br />
            <div class="acc-text">Industry:</div>
            <input name="industry" class="data-container hfill" value={viewCompany.industry} onChange={handleInputChange} />
            <br /><br />
            <div class="acc-text">Description:</div>
            <textarea name="description" class="data-container hfill" value={viewCompany.description} onChange={handleInputChange}>
            </textarea>
            <br /><br />
            <div class="acc-text">Size:</div>
            <input name="size" type="number" class="data-container hfill" value={viewCompany.size} onChange={handleInputChange} />
        </div>
    );
};

const Companies = function () {
    // https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filterText, setFilterText] = useState("");
    const [reload, setReload] = useState(false);
    const [view, setView] = useState("table");

    useEffect(() => {
        fetchCompanies().then((companies) => {
            setCompanies(companies);
            setLoading(false);
        });
    }, [reload]);

    const handleInputChange = (event) => {
        setFilterText(event.target.value);
    };


    const handleRowClick = (index) => {
        if (index === selectedCompany) setSelectedCompany(null);
        else setSelectedCompany(index);
    };

    const handleReloadClick = () => {
        setLoading(true);
        setSelectedCompany(null);
        fetchCompanies({ cache: "no-store" }).then((companies) => {
            setCompanies(companies);
            setLoading(false);
        });
    };

    const changeView = (view) => {
        setView(view);
    };

    if (loading) {
        return (<div><p>Loading...</p></div>);
    }

    else if (companies === undefined) {
        return (<div><p>Server/Api Error</p></div>);
    }

    else if (companies.length === 0) {
        return (<div><p>Empty</p></div>);
    }

    if (view === "table") {
        return (
            <CompanyTable
                companies={companies}
                selectedCompany={selectedCompany}
                handleRowClick={handleRowClick}
                handleReloadClick={handleReloadClick}
                changeView={changeView}
                handleInputChange={handleInputChange}
                filterText={filterText}
            />
        );
    }

    if (view === "item") {
        return (
            <CompanyView
                company={companies[selectedCompany]}
                changeView={changeView}
                reloadTable={handleReloadClick}
            />
        );
    }
}
