class Clicker
{
	constructor()
	{
		this.level = 1
		this.price = 20;

		this.level_display = document.getElementById("clicker_level");
		this.price_display = document.getElementById("clicker_price");
		this.productivity_display = document.getElementById("clicker_productivity");

		this.renew_display();
	}

	click()
	{
		cookies += this.get_production_value();
		cookies_produced += this.get_production_value();
		renew_cookies();
	}

	get_production_value()
	{
		return Math.floor(1 + (0.05 * altogether_productivity * (this.level - 1)) + (this.level - 1));
	}

	improve()
	{
		if(cookies >= this.price)
		{
			cookies -= this.price;
			this.level += 1;
			this.price *= 2;
			this.renew_display();
		}
		else
		{
			alert("Tu as pas assez de cookies !");
		}
	}

	renew_display()
	{
		this.level_display.innerHTML = this.level;
		this.price_display.innerHTML = this.price;
		this.productivity_display.innerHTML = this.get_production_value();
	}
}

class Building
{
	constructor(name, productivity, price)
	{
		this.name = name;
		this.level = 0;
		this.price = price;
		this.productivity = productivity;

		
		
		this.area = document.createElement("span");
		this.area.id = name;

		this.level_display = document.createElement("span");
		this.level_display.id = this.name + "_level";

		this.productivity_display = document.createElement("span");
		this.productivity_display.id = this.name + "_productivity";

		this.price_display = document.createElement("span");
		this.price_display.id = this.name + "_price";

		this.button = document.createElement("button");
		this.button.innerHTML = "Passer au niveau superieur";
	        this.button.onclick = this.improve.bind(this);

		
		this.area.append(document.createTextNode("Niveau de création automatique: "));
		this.area.append(this.level_display);
		this.area.append(document.createElement("br"));

		this.area.append(document.createTextNode("Nombre de cookies par seconde: "));
		this.area.append(this.productivity_display);
		this.area.append(document.createElement("br"));

		this.area.append(document.createTextNode("Prix pour passer au niveau superieur: "));
		this.area.append(this.price_display);
		this.area.append(document.createElement("br"));

		this.area.append(this.button);
		this.area.append(document.createElement("br"));
		this.area.append(document.createElement("br"));
        
        	setInterval(this.produce.bind(this), 1000);
	}
	
	get_price() 
	{
		return (this.price / 2) * (this.level * this.level + 1) + (this.price / 2) * (this.level + 1)
	}
	
	improve()
	{
        	if(cookies >= this.get_price())
        	{
        		cookies -= this.get_price();
        		this.level += 1;
        		altogether_productivity += this.productivity;
        		this.renew_display();
        		clicker.renew_display();
        	}
        	else
        	{
			alert("Tu as pas assez de cookies !");
		}
	}

	renew_display()
	{
		this.level_display.innerHTML = this.level;
		this.productivity_display.innerHTML = this.get_production_value();
		this.price_display.innerHTML = this.get_price();
	}


	set_visible()
	{
		buildings.append(this.area);
		this.renew_display();
	}

	produce()
	{
		cookies += this.get_production_value();
		cookies_produced += this.get_production_value();
	}
	
	get_production_value()
	{
		return this.level * this.productivity;
	}
}



function renew_cookies()
{
	cookies_display.innerHTML = cookies;
	cookies_produced_display.innerHTML = cookies_produced;
    
	
	
}


var cookies = 0;
var cookies_produced = 0;
var altogether_productivity = 0; 

var cookies_display = document.getElementById("cookies");
var cookies_produced_display = document.getElementById("cookies_produced");

var buildings = document.getElementById("buildings");

bakery_enabled = 0;
factory_enabled = 0;
cookie_tesla_enabled = 0;
cookie_gigant_enabled = 0;

clicker = new Clicker();
baker = new Building("Baker", 1, 20);
baker.set_visible();
bakery = new Building("Bakery", 10, 200);
factory = new Building("Factory", 100, 2000);
cookie_tesla = new Building("Cookie Tesla", 1000, 20000);
cookie_gigant = new Building("Cookie Gigant", 10000, 200000);

setInterval(renew_cookies, 500);