const API = "https://groep35.webdev.ilabt.imec.be/";

async function fetchApplicants() {
  var result = await apiTravelCollectionData(["applicants"], "applicants");
  return result;
}

async function postApplicant(applicant) {
  var destination = await apiTravelUrl(["applicants"]);
  var data = await apiPostResource(applicant, destination);
  return data;
}

async function patchApplicant(applicant) {
  var data = await apiPatchResource(applicant, applicant.url);
  return data;
}

async function deleteApplicant(applicant) {
  var data = await apiDeleteResource(applicant, applicant.url);
  return data;
}

async function fetchApplications() {
  var result = await apiTravelCollectionData(["applications"], "applications");
  return result;
}

async function postApplication(application) {
  var destination = await apiTravelUrl(["applications"]);
  var data = await apiPostResource(application, destination);
  return data;
}

async function patchApplication(application) {
  var data = await apiPatchResource(application, application.url);
  return data;
}

async function deleteApplication(application) {
  var data = await apiDeleteResource(application, application.url);
  return data;
}

async function fetchCompanies() {
  var result = await apiTravelCollectionData(["companies"], "companies");
  return result;
}

async function postCompany(company) {
  var destination = await apiTravelUrl(["companies"]);
  var data = await apiPostResource(company, destination);
  return data;
}

async function patchCompany(company) {
  var data = await apiPatchResource(company, company.url);
  return data;
}

async function deleteCompany(company) {
  var data = await apiDeleteResource(company, company.url);
  return data;
}

async function fetchEmployees() {
  var result = await apiTravelCollectionData(["employees"], "employees");
  return result;
}

async function postEmployee(employee) {
  var destination = await apiTravelUrl(["employees"]);
  var data = await apiPostResource(employee, destination);
  return data;
}

async function patchEmployee(employee) {
  var data = await apiPatchResource(employee, employee.url);
  return data;
}

async function deleteEmployee(employee) {
  var data = await apiDeleteResource(employee, employee.url);
  return data;
}

async function fetchRecruiters() {
  var result = await apiTravelCollectionData(["recruiters"], "recruiters");
  return result;
}

async function postRecruiter(recruiter) {
  var destination = await apiTravelUrl(["recruiters"]);
  var data = await apiPostResource(recruiter, destination);
  return data;
}

async function patchRecruiter(recruiter) {
  var data = await apiPatchResource(recruiter, recruiter.url);
  return data;
}

async function deleteRecruiter(recruiter) {
  var data = await apiDeleteResource(recruiter, recruiter.url);
  return data;
}



async function fetchRecruiters() {
  var result = await apiTravelCollectionData(["recruiters"], "recruiters");
  return result;
}

async function postRecruiter(recruiter) {
  var destination = await apiTravelUrl(["recruiters"]);
  var data = await apiPostResource(recruiter, destination);
  return data;
}

async function patchRecruiter(recruiter) {
  var data = await apiPatchResource(recruiter, recruiter.url);
  return data;
}

async function deleteRecruiter(recruiter) {
  var data = await apiDeleteResource(recruiter, recruiter.url);
  return data;
}

async function apiTravelData(checkpoints) {
  let currentUrl = API;
  let currentIndex = 0;
  console.log("traveling...");

  while (currentIndex <= checkpoints.length) {
    try {
      console.log(currentIndex, currentUrl);
      const response = await fetch(currentUrl);
      const data = await response.json();

      // If this is the last checkpoint, return the response data
      if (currentIndex === checkpoints.length) {
        return data;
      }

      // Navigate to the next checkpoint
      const parameter = checkpoints[currentIndex];
      currentUrl = data[parameter];

      currentIndex++;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}

async function apiTravelUrl(checkpoints) {
  let currentUrl = API;
  let currentIndex = 0;
  console.log("traveling...");

  while (currentIndex < checkpoints.length) {
    try {
      console.log(currentIndex, currentUrl);
      const response = await fetch(currentUrl);
      const data = await response.json();

      // Navigate to the next checkpoint
      const parameter = checkpoints[currentIndex];
      currentUrl = data[parameter];

      currentIndex++;

      if (currentIndex === checkpoints.length) {
        return currentUrl;
      }
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}

async function apiTravelCollectionData(checkpoints, collection) {
  const result = await apiTravelData(checkpoints);

  try {
    const urls = result[collection];
    const items = await Promise.all(
      urls.map(async (url) => {
        const response = await fetch(url);
        return response.json();
      })
    );

    console.log(items);
    return items;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

async function apiPatchResource(item, url) {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/vnd.jobs+json",
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error("Failed to patch company.");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

async function apiDeleteResource(item, url) {
  console.log("trying to delete", url);
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/vnd.jobs+json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete company.");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

async function apiPostResource(item, url) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.jobs+json",
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error("Failed to add company.");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
