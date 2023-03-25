import { createStore } from "solid-js/store";
import { isServer } from "solid-js/web";
import { z } from "zod";

const clickerStateParser = z
  .object({
    pixels: z.number().catch(0),
  })
  .catch({ pixels: 0 });

export type ClickerState = z.infer<typeof clickerStateParser>;

const ONE_MINUTE_IN_MILLIS = 1000 * 60;

function createClicker() {
  let [clickerStore, setClickerStore] = createStore(load());

  /*************************************************************************************************
   * LOAD / SAVE
   ************************************************************************************************/
  function load() {
    let fromStorage = {};
    try {
      fromStorage = JSON.parse(
        !isServer ? localStorage.getItem("pixel") || "" : ""
      );
    } catch {}
    return clickerStateParser.parse(fromStorage);
  }

  function save() {
    if (!isServer) {
      localStorage.setItem("pixel", JSON.stringify(clickerStore));
    }
  }
  if (!isServer) {
    setInterval(save, ONE_MINUTE_IN_MILLIS);
  }
  save();

  // Game.Object=function(name,commonName,desc,icon,iconColumn,art,price,cps,buyFunction)
  // {
  //   this.id=Game.ObjectsN;
  //   this.name=name;
  //   this.dname=name;
  //   this.displayName=this.name;
  //   commonName=commonName.split('|');
  //   this.single=commonName[0];
  //   this.plural=commonName[1];
  //   this.bsingle=this.single;this.bplural=this.plural;//store untranslated as we use those too
  //   this.actionName=commonName[2];
  //   this.extraName=commonName[3];
  //   this.extraPlural=commonName[4];
  //   this.desc=desc;
  //   if (true)//if (EN)
  //   {
  //     this.dname=loc(this.name);
  //     this.single=loc(this.single);
  //     this.plural=loc(this.plural);
  //     this.desc=loc(FindLocStringByPart(this.name+' quote'));
  //   }
  //   this.basePrice=price;
  //   this.price=this.basePrice;
  //   this.bulkPrice=this.price;
  //   this.cps=cps;
  //   this.baseCps=this.cps;
  //   this.mouseOn=false;
  //   this.mousePos=[-100,-100];
  //   this.productionAchievs=[];

  //   this.n=this.id;
  //   if (this.n!=0)
  //   {
  //     //new automated price and CpS curves
  //     this.baseCps=Math.ceil((Math.pow(this.n*1,this.n*0.5+2))*10)/10;//0.45 used to be 0.5

  //     //clamp 14,467,199 to 14,000,000 (there's probably a more elegant way to do that)
  //     var digits=Math.pow(10,(Math.ceil(Math.log(Math.ceil(this.baseCps))/Math.LN10)))/100;
  //     this.baseCps=Math.round(this.baseCps/digits)*digits;

  //     this.basePrice=(this.n*1+9+(this.n<5?0:Math.pow(this.n-5,1.75)*5))*Math.pow(10,this.n)*(Math.max(1,this.n-14));
  //     var digits=Math.pow(10,(Math.ceil(Math.log(Math.ceil(this.basePrice))/Math.LN10)))/100;
  //     this.basePrice=Math.round(this.basePrice/digits)*digits;
  //     if (this.id>=16) this.basePrice*=10;
  //     if (this.id>=17) this.basePrice*=10;
  //     if (this.id>=18) this.basePrice*=10;
  //     if (this.id>=19) this.basePrice*=10;
  //     this.price=this.basePrice;
  //     this.bulkPrice=this.price;
  //   }

  //   this.totalCookies=0;
  //   this.storedCps=0;
  //   this.storedTotalCps=0;
  //   this.icon=icon;
  //   this.iconColumn=iconColumn;
  //   this.art=art;
  //   if (art.base)
  //   {art.pic=art.base+'.png';art.bg=art.base+'Background.png';}
  //   this.buyFunction=buyFunction;
  //   this.locked=1;
  //   this.level=0;

  //   this.tieredUpgrades={};
  //   this.tieredAchievs={};
  //   this.synergies=[];
  //   this.fortune=0;

  //   this.amount=0;
  //   this.bought=0;
  //   this.highest=0;
  //   this.free=0;

  //   this.eachFrame=0;

  //   this.minigameUrl=0;//if this is defined, load the specified script if the building's level is at least 1
  //   this.minigameName=0;
  //   this.onMinigame=false;
  //   this.minigameLoaded=false;

  //   return this;
  // }

  function click() {
    setClickerStore("pixels", (p) => p + 1);
  }

  return {
    store: clickerStore,
    click,
  };
}

const clicker = createClicker();

export { clicker };
