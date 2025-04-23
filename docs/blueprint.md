# **App Name**: RetirePath

## Core Features:

- Data Input Form: Input form for user to enter their financial information (age, retirement age, tax filing status, state of residence, social security details, account balances, etc.).
- Loading Animation: Display a loading animation while waiting for the web service to return the drawdown plan.  The web service may take up to 4 minutes to complete, so a loading indicator is necessary.
- Results Visualization: Display the results in a table and generate charts and graphs to visualize the drawdown plan.

## Style Guidelines:

- Primary color: Neutral gray or white for a clean and professional look.
- Secondary color: Light blue or green for accents and highlights.
- Accent: Teal (#008080) for interactive elements and important information.
- Clear and readable sans-serif fonts for forms and data tables.
- Well-organized layout with clear sections for input form and results.
- Subtle loading animations to indicate processing.

## Original User Request:
Create an angular.js that suggests a downpath for a retiree living in the US.  A drawpath is a plan for how to spend money from their financial accounts in a tax smart way.  The site will need to collect information from the user:  age, age at the end of retirement, tax filing status, state of residence.  The site will also need to ask the age when they will take social security, the amount of  their social security benefit.  Finally the site will need to ask what the user’s expected rate of return, their expected inflation rate, and about the balance in their brokerage account and the associated cost basis and the percent of the account that will be returned to the user in the form of capital gains and dividends each year, the balance in their traditional IRA account, and the balance in their Roth account and when the first contribution was made if that contribution was less than 5 years ago.  Also we will need to ask about the amount of conversions older than 5 years old, and the conversion amount for each of the last 5 years.

After the user has input all of that information, the website will call a webservice with a TOML formatted payload to calculate their drawdown plan.  An example TOML file is below:

—--

[about]
age = 55
end_of_plan_age = 96
filing_status = single
state_of_residence = DC

[social_security]
amount = 45240
starts = 69

[predictions]
inflation = 3.0
returns = 6.5

[brokerage]
balance = 300000
basis = 150000
distributions = 6.0

[IRA]
balance = 300000

[Roth]
balance = 200000
year_opened = 2020
contributions = 10000
old_conversions = 10000
recent_conversions = [[2020, 5000],
                                    [2021, 6000],
                                    [2022, 4000],
                                    [2023, 4500],
                                    [2024, 4000]]

—-------

The webservice that will calculate their plan might take 3 or 4 minutes.  We will need to show the user some sort of animation so that they know that the request was sent and that we are waiting on an answer.  The response will be a CSV file that we will need to show the user in a table.

Here is an example CSV:

—--

age,bal_brokerage,wd_brokerage,cgd,bal_ira,wd_ira,bal_roth,wd_roth,ira_to_roth,social_security,fed_tax,state_tax,total_tax,spend_goal
55,410000,28488,24379,1246210,0,700000,70447,0,24600,0,1159,1159,106776
56,381931,35526,22135,1327214,0,670474,57449,0,9888,0,1194,1194,109979
57,346787,43666,19369,1413482,0,652872,55072,0,10185,0,1230,1230,113279
58,303454,53065,16000,1505359,0,636657,52066,0,10490,0,1266,1266,116677
59,250665,63897,11934,1603207,0,622589,48338,0,10805,0,1304,1304,120177
60,186973,34473,9745,1707416,17389,611578,68286,0,11129,0,1344,1344,123783
61,152668,41393,7110,1799878,17911,578607,66996,0,11463,0,1384,1384,127496
62,111398,49344,3965,1897795,18448,544865,65223,0,11807,0,1425,1425,131321
63,62122,58467,234,2001505,19002,510819,62895,0,12161,0,1468,1468,135261
64,3658,3658,0,2111366,47335,477039,100453,0,12526,3020,1512,4533,139318
65,0,0,0,2198194,138505,401064,40166,0,0,19201,7909,27110,143498
66,0,0,0,2193568,163824,384356,26663,0,0,24433,9945,34378,147803
67,0,0,0,2161677,168739,380943,27463,0,0,25166,10244,35410,152237
68,0,0,0,2122479,173801,376457,28287,0,0,25921,10551,36472,156804
69,0,0,0,2075342,124900,370801,13656,0,68430,30134,6268,36402,161508
70,0,0,0,2077221,124957,380359,16557,0,70482,30153,6142,36295,166354
71,0,0,0,2079162,124905,387450,19619,0,72597,30145,6003,36148,171344
72,0,0,0,2081283,124737,391740,22850,0,74775,30110,5851,35961,176484
73,0,0,0,2083721,127682,392868,24073,0,77018,30822,5959,36780,181779
74,0,0,0,2083181,131513,392766,24796,0,79329,31747,6137,37884,187232
75,0,0,0,2078527,135458,391888,25539,0,81708,32699,6321,39020,192849
76,0,0,0,2069368,139522,390161,26306,0,84160,33680,6511,40191,198635
77,0,0,0,2055286,143708,387506,27095,0,86685,34690,6706,41397,204594
78,0,0,0,2035830,148019,383838,27908,0,89285,35731,6908,42639,210732
79,0,0,0,2010519,152460,379066,28745,0,91964,36803,7115,43918,217054
80,0,0,0,1978834,157033,373092,29607,0,94723,37907,7328,45235,223565
81,0,0,0,1940217,161744,365811,30495,0,97564,39044,7548,46592,230272
82,0,0,0,1894074,166597,357111,31410,0,100491,40216,7775,47990,237180
83,0,0,0,1839763,171595,346871,32353,0,103506,41422,8008,49430,244296
84,0,0,0,1776599,176742,334962,33323,0,106611,42665,8248,50913,251625
85,0,0,0,1703848,182045,321246,34323,0,109809,43945,8495,52440,259173
86,0,0,0,1620720,187506,305573,35353,0,113104,45263,8750,54013,266949
87,0,0,0,1526373,193131,287784,36413,0,116497,46621,9013,55634,274957
88,0,0,0,1419902,198925,267710,37506,0,119992,48019,9283,57303,283206
89,0,0,0,1300341,204893,245168,38631,0,123591,49460,9562,59022,291702
90,0,0,0,1166652,211040,219962,39790,0,127299,50944,9849,60792,300453
91,0,0,0,1017727,217371,191884,40983,0,131118,52472,10144,62616,309467
92,0,0,0,852380,223892,160709,42213,0,135052,54046,10448,64495,318751
93,0,0,0,669339,230609,126198,43479,0,139103,55668,10762,66429,328313
94,0,0,0,467248,237527,88096,44784,0,143276,57338,11085,68422,338162
95,0,0,0,244653,244653,46127,46127,0,147575,59058,11417,70475,348307

—--

It would also be nice to show some graphs or charts based on the data contained in the CSV.
  