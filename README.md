# Read Me

Like many people, we have trouble keeping track of what we spend my money on. Whether on what, who, subscriptions, food, or anything. It is hard to track. The personal finance tracker is an application to help everybody that struggles with handling finances and budgeting or simply for someone that wants an easier time with it. Our tracker allows for personal growth with understanding responsibility, financial understanding, organization, and much more. Different from YNAB (You Need A Budget), it is an automatic finance tracker and budget in one that allows for more effective results in helping track finances. Our product has an automation mode, if the customer/consumer would give the application the authority in order to take their banking history, an AI API would detail the expenses and transfer them into a list automatically so that everything is categorized effectively. However, if you do not want to trust the AI API there is also a way to do it manually. For example, if your bank statement says Walmart - 45, Gas - 40, and Auto Repairs - 100, it would put those three into categories. Walmart would be under a groceries tab, and the other two would be under an Automobile/Car tab. The other way described will have the user input the amount, date, place, description, and category of the transaction in order to be able to use the application effectively.<br>
<br>
Members: Anthony Swearingen, Erin Whiting, Grace Umstot<br>
<br>
Pick 1(Anthony vote: Webpage) (Erin vote: Webpage) (Grace vote: Webpage)<br>
Webpage: Javascript, HTML, Tailwind(Endline css) OR python(with flask do not want to do)<br>
iPhone App: Swift(Xcode)<br>
Android App: Kotlin<br>
<br>
login/sign up page -> profile access -> link bank account(fake) -> microservice connects to bank(what paypal does)(fake) -> AI checks past statements and catagorizes(fake)<br>
<br>
categories -> amount(int in list), date(date in list), place(string in list), description(string in list)<br>
<br>
groceries [[1, 2], [10-11-23, 10-12-23], ["walmart", "target"], ["food", "food"]]<br>
car [[1, 2], [10-11-23, 10-12-23], ["auto zone", "auto repair shop"], ["tires", "gaskets"]]<br>
<br>
groceries[1,1,1,1]<br>
TODO:<br>
Grace and Erin start front end development<br>
Anthony starts backend development<br>