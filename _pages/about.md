---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

I am a third (2019-) year Computer Science Master student at Fudan University, under the superivision of Professor <a href='http://faet.fudan.edu.cn/e4/81/c23830a255105/page.htm'>Rui Feng</a>. I obtained my bachelor degree from School of Automation (Li-siguang Project) at China University of Geosciences (Wuhan) , advised by <a href='http://grzy.cug.edu.cn/donghaobin/zh_CN/index.htm'>Prof. Haobin Dong</a> and <a href='http://grzy.cug.edu.cn/zhuyuan/zh_CN/index.htm'>Prof. Yuan Zhu</a>. I have interned at United-imaging Intelligence, co-worked with <a href='https://scholar.google.com/citations?hl=en&user=4UxzoMkAAAAJ&view_op=list_works&sortby=pubdate'>Fan Yang</a>. I have also been a summer intern in Alipay, focued graph mining to recognize risk users. 

Duiring my M.S. degree period, I focued on Medical Image Analysis including target segmentation and diease recogenizision.
Clike google scholar badge <a href='https://scholar.google.com/citations?user=UJ1OJPwAAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations"></a> to look through my publications.
 <!-- which the work published with total <a href='https://scholar.google.com/citations?user=UJ1OJPwAAAAJ'>google scholar citations <strong><span id='total_cit'>50+</span></strong></a> (You can also use google scholar badge <a href='https://scholar.google.com/citations?user=UJ1OJPwAAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations"></a>). -->

My research interests includes machine learning and computer vision, especially in the feild of health care. I am also interested in inter-disciplinary research like Computational Methods for Multi-scale Physical Problems. (stay hungry 💦). 

<!-- **I am looking for a Ph.D program starting at fall 2022 or spring 2023.** -->

# 🔥 News
- <!-- *2022.02*: --> &nbsp; 🎓 **I am looking for a Ph.D program starting at fall 2022 or spring 2023.**

# 📝 Publications 
## 💉 Medical Image Analysis

<!-- <div class='paper-box'><div class='paper-box-image'><img src='images/500x300.png' alt="sym" width="100%"></div>
<div class='paper-box-text' markdown="1">

[Deep Residual Learning for Image Recognition](https://openaccess.thecvf.com/content_cvpr_2016/papers/He_Deep_Residual_Learning_CVPR_2016_paper.pdf), **Kaiming He**, Xiangyu Zhang, Shaoqing Ren, Jian Sun

**Jounal of Computer, 2023** \| [**Project**](https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=DhtAFkwAAAAJ&citation_for_view=DhtAFkwAAAAJ:ALROH1vI_8AC) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong>
- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
</div>
</div> -->
<!-- 
<div class='paper-box'><div class='paper-box-image'><img src='images/500x300.png' alt="sym" width="100%"></div>
<div class='paper-box-text' markdown="1">

[Deep Residual Learning for Image Recognition](https://openaccess.thecvf.com/content_cvpr_2016/papers/He_Deep_Residual_Learning_CVPR_2016_paper.pdf), **Kaiming He**, Xiangyu Zhang, Shaoqing Ren, Jian Sun

**ISBRA, 2022** \| [**Project**](https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=DhtAFkwAAAAJ&citation_for_view=DhtAFkwAAAAJ:ALROH1vI_8AC) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong>
- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
</div>
</div> -->

<div class='paper-box'><div class='paper-box-image'><img src='images/ICIP2021.png' alt="sym" width="100%"></div>
<div class='paper-box-text' markdown="1">

[Exploiting Deep Cross-Slice Features From CT Images For Multi-Class Pneumonia Classification](https://ieeexplore.ieee.org/document/9506553), Jiawang Cao<sup>#</sup>, Lulu Jiang<sup>#</sup>, Junlin Hou, Longquan Jiang, Ruiwei Zhao, Weiya Shi, Fei Shan, Rui Feng. <sup>#</sup>equal contribution.

**2021 IEEE International Conference on Image Processing (ICIP), 205-209** \| [**Paper**](https://ieeexplore.ieee.org/document/9506553) <strong><span class='show_paper_citations' data='UJ1OJPwAAAAJ:UeHWp8X0CEIC'></span></strong>
- We propose a novel two-stage method to fully exploit deep cross-slice features from volumetric CT data, including a dual-task supervised CNN and a context-aware Bi-LSTM.  
- The experimental results indicate the superiority of our proposed model on the multi-class pneumonia classification task. 
- **Best Student Paper Award**
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><img src='images/ATM.png' alt="sym" width="100%"></div>
<div class='paper-box-text' markdown="1">

[Deep learning for detecting corona virus disease 2019 (COVID-19) on high-resolution computed tomography: a pilot study](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7210135/), Shuyi Yang<sup>#</sup>, Longquan Jiang<sup>#</sup>, Zhuoqun Cao, Liya Wang, **Jiawang Cao**, Rui Feng, Zhiyong Zhang, Xiangyang Xue, Yuxin Shi, and Fei Shan. <sup>#</sup> equal contribution.

**Annals of translational medicine 8 (7)** \| [**Paper**](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7210135/) <strong><span class='show_paper_citations' data='UJ1OJPwAAAAJ:d1gkVwhDpl0C'></span></strong>
- Deep learning (DL) with DenseNet can accurately classify COVID-19 on HRCT with an AUC of 0.98, which can reduce the miss diagnosis rate (combined with radiologists’ evaluation) and radiologists’ workload.
</div>
</div>

## 👀 Computer Vision for Video Processing
- [Fuzzy SLIC: Fuzzy simple linear iterative clustering](https://ieeexplore.ieee.org/document/9175036/), Chong Wu, Jiangbin Zheng, Zhenan Feng, Houwang Zhang, Le Zhang, **Jiawang Cao**, Hong Yan, **IEEE Transactions on Circuits and Systems for Video Technology (IEEE T-CSVT), 31 (6), 2114-2124**
- [Superpixel tensor pooling for visual tracking using multiple midlevel visual cues fusion](https://ieeexplore.ieee.org/document/8865033/), Chong Wu, Le Zhang, **Jiawang Cao**, Hong Yan, **IEEE Access,7, 147462-147469**

## 📄 Machine Learning for Data Mining

- [Star Topology Convolution for Graph Representation Learning](https://www.techrxiv.org/articles/preprint/Star_Topology_Convolution_for_Graph_Representation_Learning/12805799), Chong Wu, Zhenan Feng, Jiangbin Zheng, Houwang Zhang, **Jiawang Cao**, Hong Yan. <!-- **CVPR 2020** -->

# 🎖 Honors and Awards
- *2021.10* National Schloarship at FDU (Top 1%).
- *2020.12* Award for Outstanding Students of Master's Degrees (2020-2021) at FDU . 
- *2019.12* The Second Pirce in The 16th China Post-Graguate Mathematical Contest in Modeling.
- *2018.10* "Haiyin" Schloarship at CUG.
- *2017.10* Award for Outstanding Students (2017-2018) at CUG.
- *2016.10* National Schloarship at CUG (Top 1%). 

# 📖 Educations
- *2019.09 - 2022.06 (now)*:
Computer Science, Fudan University (FDU), Shanghai, China. GPA: 3.35/4.0. 
- *2015.09 - 2019.06*:
Automation, China uiversity of Geosciences (CUG), Wuhan, China. Ranking: 3/98, Li-siguang project (30/4500) .

# 💬 Invited Talks
- *2021.09*, Atrous High-Order Attention Network for Medical Image Segmentation, ISBRA 2022 Track 2.
<!-- - *2021.03*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  \| [\[video\]](https://github.com/) -->

# 💻 Internships
- *2021.06 - 2022.09*, [Ant Group Finacial Technology](https://tech.antfin.com/products/dsg), Shanghai, China.
- *2020.12 - 2021.05*, [UII](https://github.com/fyangneil/computer-vision-intern-and-full-time),Shanghai, China.