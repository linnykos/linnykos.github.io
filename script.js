const websiteLinks = {
    shuxiao_chen: "https://sxc.moe/",
    willaim_greenleaf: "https://greenleaf.stanford.edu/",
    jing_lei: "http://www.stat.cmu.edu/~jinglei/",
    han_liu: "http://magics.cs.northwestern.edu/index.html",
    zongming_ma: "https://zmastat.github.io/",
    garry_nolan: "http://web.stanford.edu/group/nolan/",
    yixuan_qiu: "https://statr.me/",
    kathryn_roeder: "https://kathrynmroeder.github.io/",
    michael_snyder: "https://med.stanford.edu/snyderlab.html",
    nancy_zhang: "https://nzhanglab.github.io/",
    // journals below
};

const links = document.querySelectorAll(".link");
links.forEach(link => {
    const linkKey = link.getAttribute("data-link");
    link.href = websiteLinks[linkKey];
});
