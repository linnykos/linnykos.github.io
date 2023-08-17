const websiteLinks = {
    joonyong_an: "https://joonanlab.github.io/team/joonan.html",
    shuxiao_chen: "https://sxc.moe/",
    li_chen: "https://biostat.ufl.edu/profile/chen-li-1/",
    bernie_devlin: "https://devlinbj.github.io/",
    anjalie_field: "https://anjalief.github.io/",
    peter_freeman: "http://www.stat.cmu.edu/~pfreeman/",
    willaim_greenleaf: "https://greenleaf.stanford.edu/",
    max_gsell: "https://www.andrew.cmu.edu/user/mgsell/",
    sangwon_hyun: "http://sangwon-hyun.org/",
    yuchao_jiang: "https://yuchaojiang.github.io/",
    jing_lei: "http://www.stat.cmu.edu/~jinglei/",
    han_liu: "http://magics.cs.northwestern.edu/index.html",
    zongming_ma: "https://zmastat.github.io/",
    garry_nolan: "http://web.stanford.edu/group/nolan/",
    rebecca_nugent: "https://www.stat.cmu.edu/~rnugent/PUBLIC/",
    chan_park: "https://chan0park.github.io/",
    yixuan_qiu: "https://statr.me/",
    alessandro_rinaldo: "https://www.stat.cmu.edu/~arinaldo/",
    kathryn_roeder: "https://kathrynmroeder.github.io/",
    stephan_sanders: "https://sanderslab.github.io/team/stephansanders",
    chad_schafer: "http://www.stat.cmu.edu/~cschafer/",
    james_sharpnack: "https://jsharpna.github.io/",
    michael_snyder: "https://med.stanford.edu/snyderlab.html",
    wei_sun: "https://research.fredhutch.org/sun/en.html",
    michael_talkowski: "https://talkowski.mgh.harvard.edu/",
    ryan_tibshirani: "https://www.stat.berkeley.edu/~ryantibs/",
    yulia_tsvetkov: "https://homes.cs.washington.edu/~yuliats/",
    robert_vanderbei: "https://vanderbei.princeton.edu/",
    daren_wang: "https://darenwang.github.io/website/",
    lie_wang: "http://math.mit.edu/~liewang/",
    donna_werling: "https://genetics.wisc.edu/staff/werling/",
    rebecca_willet: "https://voices.uchicago.edu/willett/",
    nancy_zhang: "https://nzhanglab.github.io/",
    zifeng_zhao: "https://sites.google.com/view/zifengzhao/",
    lingxue_zhu: "https://lingxuez.github.io/",
    // journals below
};

const links = document.querySelectorAll(".link");
links.forEach(link => {
    const linkKey = link.getAttribute("data-link");
    link.href = websiteLinks[linkKey];
});
