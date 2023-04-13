const API = "https://groep35.webdev.ilabt.imec.be/"

async function fetchApplicants() {
    var result = "";
    var companies = undefined;

    try {
        const response = await fetch(API);
        const data = await response.json();
        result = data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
    
    try {
        const response = await fetch(result.companies);
        const data = await response.json();
        result = data;
    } catch (error) {
        console.error(error);
        return undefined;
    }

    try {
        const companyUrls = result.companies;
        companies = await Promise.all(companyUrls.map(async (url) => {
            const companyResponse = await fetch(url);
            return companyResponse.json();
        }));

        console.log(companies);
    } catch (error) {
        console.error(error);
        return undefined;
    }
    
    return companies;
}

async function fetchCompanies() {
    var result = "";
    var companies = undefined;

    try {
        const response = await fetch(API);
        const data = await response.json();
        result = data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
    
    try {
        const response = await fetch(result.companies);
        const data = await response.json();
        result = data;
    } catch (error) {
        console.error(error);
        return undefined;
    }

    try {
        const companyUrls = result.companies;
        companies = await Promise.all(companyUrls.map(async (url) => {
            const companyResponse = await fetch(url);
            return companyResponse.json();
        }));

        console.log(companies);
    } catch (error) {
        console.error(error);
        return undefined;
    }
    
    return companies;
}

async function postCompany(company) {
    var result = "";

    try {
        const response = await fetch(API);
        const data = await response.json();
        result = data;
    } catch (error) {
        console.error(error);
        return undefined;
    }

    try {
        const response = await fetch(result.companies, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.jobs+json'
            },
            body: JSON.stringify(company)
        });

        if (!response.ok) {
            throw new Error('Failed to add company.');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

async function patchCompany(company) {
    try {
        const response = await fetch(company.url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/vnd.jobs+json'
            },
            body: JSON.stringify(company)
        });

        if (!response.ok) {
            throw new Error('Failed to add company.');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

async function deleteCompany(company) {
    try {
        const response = await fetch(company.url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/vnd.jobs+json'
            },
        });

        if (!response.ok) {
            throw new Error('Failed to add company.');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}