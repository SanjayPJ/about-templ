class Github {
    constructor() {
        this.client_id = '8205252bd0cce8b3b71e';
        this.client_secret = '8f244259101313693a1f08ee11b2ffd1aba6a649';
        this.repos_count = 100;
        this.repos_sort = 'created: asc';
    }
    async get_user(user) {
        const profile_response = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const repo_response = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
        // per_page=${this.repos_count}&sort=${this.repos_sort}&
        const profile_data = await profile_response.json();
        const repos_data = await repo_response.json();
        return {
            profile: profile_data,
            repos: repos_data
        }
    }
}


const github = new Github;
// const ui = new UI;

//search input
// const search_user = document.getElementById('search-user');
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

//search input event listener
const finder = (e) => {
    // get input text
    // const user_text = e.target.value;
    const user_text = "sanjaypj"
    if (user_text !== '') {
        github.get_user(user_text).then(data => {
            if (data.profile.message === 'Not Found') {
                //show alertw
                // ui.show_alert('User not Found', 'alert alert-danger');
            } else {
                //show profile
                // ui.show_profile(data.profile);
                // ui.show_repos(data.repos);

                let repo_table = "";
                data.repos.map(repo => {
                    date = new Date(repo.updated_at);
                    repo_table += `
                        <tr>
                            <td><a href="http://github.com/sanjaypj/${repo.name}" target="_blank">${repo.full_name}</a></td>
                            <td>${repo.language}</td>
                            <td>${date.toLocaleDateString("en-US", options)}</td>
                        </tr>
                    `;
                });
                document.getElementById('drophere').innerHTML = repo_table;

                // console.log(data.profile);
                // console.log(data.repos);
            }
        });
    } else {
        //clear profile
        // ui.clear_profile();
    }
};

finder();

let hideAll = () => {
    $("#index-content").hide();
    $("#contact-content").hide();
    $("#project-content").hide();
    $("#portfolio-content").hide();
    $("#index-container").hide();
    $("#thoughts-content").hide();
}

hideAll();
$("#index-content").show();
$("#index-container").show();

$("#index-button").click(function() {
    hideAll();
    $("#index-content").show();
    $("#index-container").show();
});

$("#contact-button").click(function() {
    hideAll();
    $("#contact-content").show();
});

$("#project-button").click(function() {
    hideAll();
    $("#project-content").show();
});

$("#portfolio-button").click(function() {
    hideAll();
    $("#portfolio-content").show();
});

$("#thoughts-button").click(function() {
    hideAll();
    $("#thoughts-content").show();
});