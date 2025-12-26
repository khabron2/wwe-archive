import { Episode, PPV, ContentType } from './types';

const YEARS = Array.from({ length: 25 }, (_, i) => 2000 + i);

const RAW_2000_DATES = [
  "2000-01-03", "2000-01-10", "2000-01-17", "2000-01-24", "2000-01-31",
  "2000-02-07", "2000-02-14", "2000-02-21", "2000-02-28", "2000-03-06",
  "2000-03-13", "2000-03-20", "2000-03-27", "2000-04-03", "2000-04-10",
  "2000-04-17", "2000-04-24", "2000-05-01", "2000-05-08", "2000-05-15",
  "2000-05-22", "2000-05-29", "2000-06-05", "2000-06-12", "2000-06-19",
  "2000-06-26", "2000-07-03", "2000-07-10", "2000-07-17", "2000-07-24",
  "2000-07-31", "2000-08-07", "2000-08-14", "2000-08-21", "2000-08-28",
  "2000-09-04", "2000-09-11", "2000-09-18", "2000-09-25", "2000-10-02",
  "2000-10-09", "2000-10-16", "2000-10-23", "2000-10-30", "2000-11-06",
  "2000-11-13", "2000-11-20", "2000-11-27", "2000-12-04", "2000-12-11",
  "2000-12-18", "2000-12-25"
];

const RAW_2001_DATES = [
  "2001-01-01", "2001-01-08", "2001-01-15", "2001-01-22", "2001-01-29",
  "2001-02-05", "2001-02-12", "2001-02-19", "2001-02-26", "2001-03-05",
  "2001-03-12", "2001-03-19", "2001-03-26", "2001-04-02", "2001-04-09",
  "2001-04-16", "2001-04-23", "2001-04-30", "2001-05-07", "2001-05-14",
  "2001-05-21", "2001-05-28", "2001-06-04", "2001-06-11", "2001-06-18",
  "2001-06-25", "2001-07-02", "2001-07-09", "2001-07-16", "2001-07-23",
  "2001-07-30", "2001-08-06", "2001-08-13", "2001-08-20", "2001-08-27",
  "2001-09-03", "2001-09-10", "2001-09-17", "2001-09-24", "2001-10-01",
  "2001-10-08", "2001-10-15", "2001-10-22", "2001-10-29", "2001-11-05",
  "2001-11-12", "2001-11-19", "2001-11-26", "2001-12-03", "2001-12-10",
  "2001-12-17", "2001-12-24", "2001-12-31"
];

const RAW_2002_DATES = [
  "2002.01.07", "2002.01.14", "2002.01.21", "2002.01.28", "2002.02.04",
  "2002.02.11", "2002.02.18", "2002.02.25", "2002.03.04", "2002.03.11",
  "2002.03.18", "2002.03.25", "2002.04.01", "2002.04.08", "2002.04.15",
  "2002.04.22", "2002.04.29", "2002.05.06", "2002.05.13", "2002.05.20",
  "2002.05.27", "2002.06.03", "2002.06.10", "2002.06.17", "2002.06.24",
  "2002.07.01", "2002.07.08", "2002.07.15", "2002.07.22", "2002.07.29",
  "2002.08.05", "2002.08.12", "2002.08.19", "2002.08.26", "2002.09.02",
  "2002.09.09", "2002.09.16", "2002.09.23", "2002.09.30", "2002.10.07",
  "2002.10.14", "2002.10.21", "2002.10.28", "2002.11.04", "2002.11.11",
  "2002.11.18", "2002.11.25", "2002.12.02", "2002.12.09", "2002.12.16",
  "2002.12.23", "2002.12.30"
];

const RAW_2003_DATES = [
  "2003.01.06", "2003.01.13", "2003.01.20", "2003.01.27", "2003.02.03",
  "2003.02.10", "2003.02.17", "2003.02.24", "2003.03.03", "2003.03.10",
  "2003.03.17", "2003.03.24", "2003.03.31", "2003.04.07", "2003.04.14",
  "2003.04.21", "2003.04.28", "2003.05.05", "2003.05.12", "2003.05.19",
  "2003.05.26", "2003.06.02", "2003.06.09", "2003.06.16", "2003.06.23",
  "2003.06.30", "2003.07.07", "2003.07.14", "2003.07.21", "2003.07.28",
  "2003.08.04", "2003.08.11", "2003.08.18", "2003.08.25", "2003.09.01",
  "2003.09.08", "2003.09.15", "2003.09.22", "2003.09.29", "2003.10.06",
  "2003.10.13", "2003.10.20", "2003.10.27", "2003.11.03", "2003.11.10",
  "2003.11.17", "2003.11.24", "2003.12.01", "2003.12.08", "2003.12.15",
  "2003.12.22", "2003.12.29"
];

const RAW_2004_DATES = [
  "2004.01.05", "2004.01.12", "2004.01.19", "2004.01.26", "2004.02.02",
  "2004.02.09", "2004.02.16", "2004.02.23", "2004.03.01", "2004.03.08",
  "2004.03.15", "2004.03.22", "2004.03.29", "2004.04.05", "2004.04.12",
  "2004.04.19", "2004.04.26", "2004.05.03", "2004.05.10", "2004.05.17",
  "2004.05.24", "2004.05.31", "2004.06.07", "2004.06.14", "2004.06.21",
  "2004.06.28", "2004.07.05", "2004.07.12", "2004.07.19", "2004.07.26",
  "2004.08.02", "2004.08.09", "2004.08.16", "2004.08.23", "2004.08.30",
  "2004.09.06", "2004.09.13", "2004.09.20", "2004.09.27", "2004.10.04",
  "2004.10.11", "2004.10.18", "2004.10.25", "2004.11.01", "2004.11.08",
  "2004.11.15", "2004.11.22", "2004.11.29", "2004.12.06", "2004.12.13",
  "2004.12.20", "2004.12.27"
];

const RAW_2005_DATES = [
  "2005.01.03", "2005.01.10", "2005.01.17", "2005.01.24", "2005.01.31",
  "2005.02.07", "2005.02.14", "2005.02.21", "2005.02.28", "2005.03.07",
  "2005.03.14", "2005.03.21", "2005.03.28L", "2005.04.04", "2005.04.11",
  "2005.04.18", "2005.04.25.", "2005.05.02", "2005.05.09", "2005.05.16",
  "2005.05.23", "2005.05.30", "2005.06.06", "2005.06.13", "2005.06.20",
  "2005.06.27", "2005.07.04", "2005.07.11", "2005.07.18", "2005.07.25",
  "2005.08.01", "2005.08.08", "2005.08.15", "2005.08.22", "2005.08.29",
  "2005.09.05", "2005.09.12", "2005.09.19", "2005.09.26", "2005.10.03",
  "2005.10.10", "2005.10.17", "2005.10.24", "2005.10.31", "2005.11.07",
  "2005.11.14", "2005.11.21", "2005.11.28", "2005.12.05", "2005.12.12",
  "2005.12.19", "2005.12.26"
];

const RAW_2006_URLS = [
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E01%20-%20Raw%20-%20Jan.%2002,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E02%20-%20Raw%20-%20Jan.%2009,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E03%20-%20Raw%20-%20Jan.%2016,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E04%20-%20Raw%20-%20Jan.%2023,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E05%20-%20Raw%20-%20Jan.%2030,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E06%20-%20Raw%20-%20Feb.%2006,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E07%20-%20Raw%20-%20Feb.%2013,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E08%20-%20Raw%20-%20Feb.%2020,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E09%20-%20Raw%20-%20Feb.%2027,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E10%20-%20Raw%20-%20Mar.%2006,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E11%20-%20Raw%20-%20Mar.%2013,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E12%20-%20Raw%20-%20Mar.%2020,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E13%20-%20Raw%20-%20Mar.%2027,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E14%20-%20Raw%20-%20Apr.%2003,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E15%20-%20Raw%20-%20Apr.%2010,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E16%20-%20Raw%20-%20Apr.%2017,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E17%20-%20Raw%20-%20Apr.%2024,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E18%20-%20Raw%20-%20May.%2001,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E19%20-%20Raw%20-%20May.%2008,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E20%20-%20Raw%20-%20May.%2015,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E21%20-%20Raw%20-%20May.%2022,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E22%20-%20Raw%20-%20May.%2029,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E23%20-%20Raw%20-%20Jun.%2005,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E24%20-%20Raw%20-%20Jun.%2012,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E25%20-%20Raw%20-%20Jun.%2019,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E26%20-%20Raw%20-%20Jun.%2026,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E27%20-%20Raw%20-%20Jul.%2003,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E28%20-%20Raw%20-%20Jul.%2010,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E29%20-%20Raw%20-%20Jul.%2017,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E30%20-%20Raw%20-%20Jul.%2024,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E31%20-%20Raw%20-%20Jul.%2031,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E32%20-%20Raw%20-%20Aug.%2007,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E34%20-%20Raw%20-%20Aug.%2014,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E34%20-%20Raw%20-%20Aug.%2021,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E35%20-%20Raw%20-%20Aug.%2028,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E36%20-%20Raw%20-%20Sep.%2004,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E37%20-%20Raw%20-%20Sep.%2011,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E38%20-%20Raw%20-%20Sep.%2018,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E39%20-%20Raw%20-%20Sep.%2025,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E40%20-%20Raw%20-%20Oct.%2002,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E41%20-%20Raw%20-%20Oct.%2009,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E42%20-%20Raw%20-%20Oct.%2016,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E43%20-%20Raw%20-%20Oct.%2023,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E44%20-%20Raw%20-%20Oct.%2030,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E45%20-%20Raw%20-%20Nov.%2006,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E46%20-%20Raw%20-%20Nov.%2013,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E47%20-%20Raw%20-%20Nov.%2020,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E48%20-%20Raw%20-%20Nov.%2027,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E49%20-%20Raw%20-%20Dec.%2004,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E50%20-%20Raw%20-%20Dec.%2011,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E51%20-%20Raw%20-%20Dec.%2018,%202006.mp4",
  "https://archive.org/download/Raw_2006/WWE%20Raw%20S14E52%20-%20Raw%20-%20Dec.%2025,%202006.mp4",
];

const SMACKDOWN_2006_URLS = [
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E01_January 6, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E02_January 13, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E03_January 20, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E04_January 27, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E05_February 3, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E06_February 10, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E07_February 17, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E08_February 24, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E09_March 3, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E10_March 10, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E11_March 17, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E12_March 24, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E13_March 31, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E14_April 7, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E15_April 14, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E16_April 21, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E17_April 28, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E18_May 5, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E19_May 12, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E20_May 19, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E21_May 26, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E22_June 2, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E23_June 9, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E24_June 16, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E25_June 23, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E26_June 30, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E27_July 7, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E28_July 14, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E29_July 21, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E30_July 28, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E31_August 4, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E32_August 11, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E33_August 18, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E34_August 25, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E35_September 1, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E36_September 8, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E37_September 15, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E38_September 22, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E39_September 29, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E40_October 6, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E41_October 13, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E42_October 20, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E43_October 27, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E44_November 3, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E45_November 10, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E46_November 17, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E47_November 24, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E48_December 1, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E49_December 8, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E50_December 15, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E51_December 22, 2006.mp4",
  "https://archive.org/download/nwoDkcamS2006/WWE Friday Night SmackDown_S08E52_December 29, 2006.mp4",
];

const SMACKDOWN_2000_DATES = [
  "2000.01.06", "2000.01.13", "2000.01.20", "2000.01.27",
  "2000.02.03", "2000.02.10", "2000.02.17", "2000.02.24",
  "2000.03.02", "2000.03.09", "2000.03.16", "2000.03.23", "2000.03.30",
  "2000.04.06", "2000.04.13", "2000.04.20", "2000.04.27",
  "2000.05.04", "2000.05.11", "2000.05.18", "2000.05.25",
  "2000.06.01", "2000.06.08", "2000.06.15", "2000.06.22", "2000.06.29",
  "2000.07.06", "2000.07.13", "2000.07.20", "2000.07.27",
  "2000.08.03", "2000.08.10", "2000.08.17", "2000.08.24", "2000.08.31",
  "2000.09.07", "2000.09.14", "2000.09.21", "2000.09.28",
  "2000.10.05", "2000.10.12", "2000.10.19", "2000.10.26",
  "2000.11.02", "2000.11.09", "2000.11.16", "2000.11.23", "2000.11.30",
  "2000.12.07", "2000.12.14", "2000.12.21", "2000.12.28"
];

const SMACKDOWN_2001_DATES = [
  "2001.01.04", "2001.01.11", "2001.01.18", "2001.01.25",
  "2001.02.01", "2001.02.08", "2001.02.15", "2001.02.22",
  "2001.03.01", "2001.03.08", "2001.03.15", "2001.03.22", "2001.03.29",
  "2001.04.05", "2001.04.12", "2001.04.19", "2001.04.26",
  "2001.05.03", "2001.05.10", "2001.05.17", "2001.05.24", "2001.05.31",
  "2001.06.07", "2001.06.14", "2001.06.21", "2001.06.28",
  "2001.07.05", "2001.07.12", "2001.07.19", "2001.07.26",
  "2001.08.02", "2001.08.09", "2001.08.16", "2001.08.23", "2001.08.30",
  "2001.09.04", "2001.09.13", "2001.09.20", "2001.09.27",
  "2001.10.04", "2001.10.11", "2001.10.18", "2001.10.25",
  "2001.11.01", "2001.11.08", "2001.11.15", "2001.11.22", "2001.11.29",
  "2001.12.06", "2001.12.13", "2001.12.20", "2001.12.27"
];

const SMACKDOWN_2002_MAPPING_DATES = [
  "2003.01.02", "2003.01.09", "2003.01.16", "2003.01.23", "2003.01.30",
  "2003.02.06", "2003.02.13", "2003.02.20", "2003.02.27", "2003.03.06",
  "2003.03.13", "2003.03.20", "2003.03.27", "2003.04.03", "2003.04.10",
  "2003.04.17", "2003.04.24", "2003.05.01", "2003.05.08", "2003.05.15",
  "2003.05.22", "2003.05.29", "2003.06.05", "2003.06.12", "2003.06.19",
  "2003.06.26", "2003.07.03", "2003.07.10", "2003.07.17", "2003.07.24",
  "2003.07.31", "2003.08.07", "2003.08.14", "2003.08.21", "2003.08.28",
  "2003.09.04", "2003.09.11", "2003.09.18", "2003.09.25", "2003.10.02",
  "2003.10.09", "2003.10.16", "2003.10.23", "2003.10.30", "2003.11.06",
  "2003.11.13", "2003.11.20", "2003.11.27", "2003.12.04", "2003.12.11",
  "2003.12.18", "2003.12.25"
];

const SMACKDOWN_2003_DATES = [...SMACKDOWN_2002_MAPPING_DATES];

const SMACKDOWN_2004_DATES = [
  "2004.01.01", "2004.01.08", "2004.01.15", "2004.01.22", "2004.01.29",
  "2004.02.05", "2004.02.12", "2004.02.19", "2004.02.26", "2004.03.04",
  "2004.03.11", "2004.03.18", "2004.03.25", "2004.04.01", "2004.04.08",
  "2004.04.15", "2004.04.22", "2004.04.29", "2004.05.06", "2004.05.13",
  "2004.05.20", "2004.05.27", "2004.06.03", "2004.06.10", "2004.06.17",
  "2004.06.24", "2004.07.01", "2004.07.08", "2004.07.15", "2004.07.22",
  "2004.07.29", "2004.08.05", "2004.08.12", "2004.08.21", "2004.08.26",
  "2004.09.02", "2004.09.09", "2004.09.16", "2004.09.23", "2004.09.30",
  "2004.10.07", "2004.10.14", "2004.10.21", "2004.10.28", "2004.11.04",
  "2004.11.11", "2004.11.18", "2004.11.25", "2004.12.02", "2004.12.09",
  "2004.12.16", "2004.12.23", "2004.12.30"
];

const SMACKDOWN_2005_DATES = [
  "2005.01.06", "2005.01.13", "2005.01.20", "2005.01.27", "2005.02.03",
  "2005.02.10", "2005.02.17", "2005.02.24", "2005.03.03", "2005.03.10",
  "2005.03.17", "2005.03.24", "2005.03.31", "2005.04.07", "2005.04.14",
  "2005.04.21", "2005.04.28", "2005.05.05", "2005.05.12", "2005.05.19",
  "2005.05.26", "2005.06.02", "2005.06.09", "2005.06.16", "2005.06.23",
  "2005.06.30", "2005.07.07", "2005.07.14", "2005.07.21", "2005.07.28",
  "2005.08.04", "2005.08.11", "2005.08.18", "2005.08.25", "2005.09.01",
  "2005.09.09", "2005.09.16", "2005.09.23", "2005.09.30", "2005.10.07",
  "2005.10.14", "2005.10.21", "2005.10.28", "2005.11.04", "2005.11.11",
  "2005.11.18", "2005.11.25", "2005.11.29", "2005.12.02", "2005.12.09",
  "2005.12.16", "2005.12.23", "2005.12.30"
];

const RAW_2000_COVER = "https://image.tmdb.org/t/p/w500/vxqChitYWBi8zyF8p50j69OtNhY.jpg";
const RAW_2001_COVER = "https://image.tmdb.org/t/p/w500/hWyxKRbOMzp1ng6QDzfJmoMeapT.jpg";
const RAW_2002_COVER = "https://image.tmdb.org/t/p/w500/4yqu0RrLUA63h7biYmlnDGElWak.jpg";
const RAW_2003_COVER = "https://image.tmdb.org/t/p/w500/uAkpgNEm4lve8M8uxtq14DiYgKa.jpg";
const RAW_2004_COVER = "https://image.tmdb.org/t/p/w500/9C7crJAU5Dq1wGx1Ihf89emho9J.jpg";
const RAW_2005_COVER = "https://image.tmdb.org/t/p/w500/hg8oWjvCFSzF1pgoUlyRVf7KVqL.jpg";
const RAW_2006_COVER = "https://image.tmdb.org/t/p/w500/8lQGy5RN1YT3skVwDHEuqVFgGV1.jpg";
const SD_2000_COVER = "https://image.tmdb.org/t/p/w500/kTid61XX4xADJW6qguCZqmj8pcy.jpg";
const SD_2001_COVER = "https://image.tmdb.org/t/p/w500/2oj1HQg3CJrbORwX8Kj50jSvI6F.jpg";
const SD_2002_COVER = "https://image.tmdb.org/t/p/w500/magLujH3BIhZqlLbRCXEOqLwOTg.jpg";
const SD_2003_COVER = "https://image.tmdb.org/t/p/w500/a95NYvLCiIfg9KT5uD5KOlRmomq.jpg";
const SD_2004_COVER = "https://image.tmdb.org/t/p/w500/vHAR4sewpDmrsK2PpNwsVVWyCqr.jpg";
const SD_2005_COVER = "https://image.tmdb.org/t/p/w500/fpLNMIsdUSE1wXn7DS3QrhLdgxK.jpg";
const SD_2006_COVER = "https://image.tmdb.org/t/p/w500/jhp2b9pHVGhPV0S2wsSSozeDHpT.jpg";
const SD_GENERIC_COVER = "https://image.tmdb.org/t/p/w500/o7n823Ym9FhWnNf736I64zN6jW9.jpg";

const generateEpisodes = (year: number, type: ContentType): Episode[] => {
  let count = 0;
  
  if (year === 2000) {
    if (type === 'RAW') count = RAW_2000_DATES.length;
    if (type === 'SMACKDOWN') count = SMACKDOWN_2000_DATES.length;
  } else if (year === 2001) {
    if (type === 'RAW') count = RAW_2001_DATES.length;
    if (type === 'SMACKDOWN') count = SMACKDOWN_2001_DATES.length;
  } else if (year === 2002) {
    if (type === 'RAW') count = RAW_2002_DATES.length;
    if (type === 'SMACKDOWN') count = SMACKDOWN_2002_MAPPING_DATES.length;
  } else if (year === 2003) {
    if (type === 'RAW') count = RAW_2003_DATES.length;
    if (type === 'SMACKDOWN') count = SMACKDOWN_2003_DATES.length;
  } else if (year === 2004) {
    if (type === 'RAW') count = RAW_2004_DATES.length;
    if (type === 'SMACKDOWN') count = SMACKDOWN_2004_DATES.length;
  } else if (year === 2005) {
    if (type === 'RAW') count = RAW_2005_DATES.length;
    if (type === 'SMACKDOWN') count = SMACKDOWN_2005_DATES.length;
  } else if (year === 2006) {
    if (type === 'RAW') count = RAW_2006_URLS.length;
    if (type === 'SMACKDOWN') count = SMACKDOWN_2006_URLS.length;
  } else {
    count = 0; // Empty for non-populated years
  }
  
  return Array.from({ length: count }, (_, i) => {
    let videoUrl = undefined;
    let dateStr = "";
    let thumb = type === 'RAW' ? RAW_2000_COVER : SD_GENERIC_COVER;

    if (year === 2000) {
      if (type === 'RAW') {
        const date = RAW_2000_DATES[i];
        videoUrl = `https://archive.org/download/WAR-2000/${date}.mp4`;
        dateStr = date;
        thumb = RAW_2000_COVER;
      } else if (type === 'SMACKDOWN') {
        const date = SMACKDOWN_2000_DATES[i];
        videoUrl = `https://archive.org/download/2000.02.03/${date}.mp4`;
        dateStr = date.replace(/\./g, '-');
        thumb = SD_2000_COVER;
      }
    } else if (year === 2001) {
      if (type === 'RAW') {
        const date = RAW_2001_DATES[i];
        videoUrl = `https://archive.org/download/2001-12-31/${date}.mp4`;
        dateStr = date;
        thumb = RAW_2001_COVER;
      } else if (type === 'SMACKDOWN') {
        const date = SMACKDOWN_2001_DATES[i];
        videoUrl = `https://archive.org/download/2001.03.15/${date}.mp4`;
        dateStr = date.replace(/\./g, '-');
        thumb = SD_2001_COVER;
      }
    } else if (year === 2002) {
      if (type === 'RAW') {
        const date = RAW_2002_DATES[i];
        videoUrl = `https://archive.org/download/2002.01.28/${date}.mp4`;
        dateStr = date.replace(/\./g, '-');
        thumb = RAW_2002_COVER;
      } else if (type === 'SMACKDOWN') {
        const date = SMACKDOWN_2002_MAPPING_DATES[i];
        videoUrl = `https://archive.org/download/2003.05.22/${date}.mp4`;
        dateStr = date.replace(/\./g, '-').replace('2003', '2002');
        thumb = SD_2002_COVER;
      }
    } else if (year === 2003) {
      if (type === 'RAW') {
        const date = RAW_2003_DATES[i];
        videoUrl = `https://archive.org/download/2003.12.29/${date}.mp4`;
        dateStr = date.replace(/\./g, '-');
        thumb = RAW_2003_COVER;
      } else if (type === 'SMACKDOWN') {
        const date = SMACKDOWN_2003_DATES[i];
        videoUrl = `https://archive.org/download/2003.05.22/${date}.mp4`;
        dateStr = date.replace(/\./g, '-');
        thumb = SD_2003_COVER;
      }
    } else if (year === 2004) {
      if (type === 'RAW') {
        const date = RAW_2004_DATES[i];
        videoUrl = `https://archive.org/download/2004.06.14/${date}.mp4`;
        dateStr = date.replace(/\./g, '-');
        thumb = RAW_2004_COVER;
      } else if (type === 'SMACKDOWN') {
        const date = SMACKDOWN_2004_DATES[i];
        videoUrl = `https://archive.org/download/2004.06.24/${date}.mp4`;
        dateStr = date.replace(/\./g, '-');
        thumb = SD_2004_COVER;
      }
    } else if (year === 2005) {
      if (type === 'RAW') {
        const date = RAW_2005_DATES[i];
        videoUrl = `https://archive.org/download/2005.10.03/${date}.mp4`;
        dateStr = date.replace(/\./g, '-').replace('L', '').replace(/\.$/, '');
        thumb = RAW_2005_COVER;
      } else if (type === 'SMACKDOWN') {
        const date = SMACKDOWN_2005_DATES[i];
        videoUrl = `https://archive.org/download/2005.11.18/${date}.mp4`;
        dateStr = date.replace(/\./g, '-');
        thumb = SD_2005_COVER;
      }
    } else if (year === 2006) {
      const monthMap: Record<string, string> = {
        'Jan': '01', 'January': '01',
        'Feb': '02', 'February': '02',
        'Mar': '03', 'March': '03',
        'Apr': '04', 'April': '04',
        'May': '05',
        'Jun': '06', 'June': '06',
        'Jul': '07', 'July': '07',
        'Aug': '08', 'August': '08',
        'Sep': '09', 'September': '09',
        'Oct': '10', 'October': '10',
        'Nov': '11', 'November': '11',
        'Dec': '12', 'December': '12'
      };

      if (type === 'RAW') {
        videoUrl = RAW_2006_URLS[i];
        const decoded = decodeURIComponent(videoUrl);
        const match = decoded.match(/([a-zA-Z]{3})\.\s*(\d{2}),\s*(\d{4})/);
        if (match) {
          dateStr = `${match[3]}-${monthMap[match[1]]}-${match[2]}`;
        } else {
          dateStr = `2006-01-${String(i+1).padStart(2, '0')}`;
        }
        thumb = RAW_2006_COVER;
      } else if (type === 'SMACKDOWN') {
        videoUrl = SMACKDOWN_2006_URLS[i];
        const decoded = decodeURIComponent(videoUrl);
        // Match format like "January 6, 2006"
        const match = decoded.match(/([a-zA-Z]+)\s+(\d{1,2}),\s*(\d{4})/);
        if (match) {
          const month = monthMap[match[1]] || '01';
          const day = match[2].padStart(2, '0');
          dateStr = `${match[3]}-${month}-${day}`;
        } else {
          dateStr = `2006-01-${String(i+1).padStart(2, '0')}`;
        }
        thumb = SD_2006_COVER;
      }
    } else {
        thumb = `https://picsum.photos/seed/${type}-${year}-${i}/400/600`;
    }

    return {
      id: `${type.toLowerCase()}-${year}-ep-${i + 1}`,
      showType: type,
      season: year,
      episodeNumber: i + 1,
      title: `${type} #${i + 1}`,
      date: dateStr,
      thumbnail: thumb,
      duration: '90 min',
      description: `WWE ${type} episode from ${dateStr}. Legendary matches and segments that defined the era.`,
      videoUrl
    };
  });
};

const PPV_NAMES = [
  "Royal Rumble", "No Way Out", "WrestleMania", "Backlash", "Judgment Day", 
  "King of the Ring", "Fully Loaded", "SummerSlam", "Unforgiven", 
  "No Mercy", "Survivor Series", "Armageddon"
];

const generatePPVs = (year: number): PPV[] => {
  return PPV_NAMES.map((name, i) => ({
    id: `ppv-${year}-${i}`,
    name: `${name} ${year}`,
    date: `${year}-${String(i + 1).padStart(2, '0')}-20`,
    year: year,
    thumbnail: `https://picsum.photos/seed/ppv-${year}-${i}/400/600`,
    description: `The grand stage of ${name} ${year}. Witness the history in the making.`
  }));
};

export const RAW_CONTENT = YEARS.map(year => ({
  year,
  episodes: generateEpisodes(year, 'RAW')
}));

export const SMACKDOWN_CONTENT = YEARS.map(year => ({
  year,
  episodes: generateEpisodes(year, 'SMACKDOWN')
}));

export const PPV_CONTENT = YEARS.map(year => ({
  year,
  ppvs: generatePPVs(year)
}));

export const ALL_YEARS = YEARS;
