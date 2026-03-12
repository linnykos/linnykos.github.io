This data refers to the paper "Bakken, T. E., Miller, J. A., Ding, S.-L., Sunkin, S. M., Smith, K. A., Ng, L., Szafer, A., Dalley, R. A., Royall, J. J., Lemon, T., et al. (2016). A comprehensive transcriptional map of primate brain development." that Fuchen used in "Liu, F., Choi, D., Xie, L., and Roeder, K. (2018). Global spectral clustering in dynamic networks." (her PNAS) paper.

To read said files, use something like:
 read.csv("All_human_Pretime_new_E40.csv", sep = " ")

======

This originaling paper is https://pubmed.ncbi.nlm.nih.gov/27409810/, Bakken et al. 2016. The data was named lmd_expression_matrix_2014-03-06.zip (which is likely renamed by the scientist who originally downloaded the data), which originates from https://github.com/emmetaobrien/nhpatlas/tree/v01.00, which in turn points to http://blueprintnhpatlas.org/static/download. Here, you can see that this data traces back to the following (quote from the website):
======
DNA microarray data from the “Transcriptional Architecture of the Primate Neocortex” study. Samples over 10 cortical areas, hippocampus and dorsal lateral geniculate nucleus were obtained using laser microdissection. Each area was assayed in duplicate in both male and female adult animals using Affymetrix GeneChip Rhesus Macaque Genome Arrays. The microarray files are available for download at http://download.alleninstitute.org/nhp/.
======
This paper links to https://pubmed.ncbi.nlm.nih.gov/22445337/, which I believe is a predecessor paper, as its first author (Amy Bernard, 2012) is one the last authors on the Bakken paper.

The adjacency matrices are constructed by using the samples in all layers (L6-L2) for the mPFC, computing the correlation matrix, raising all entries to the 6th power (i.e., (cor(x))^6), and then setting all the diagonal entries to 0.