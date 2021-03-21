import json
import codecs

print("Matching [Name] and [English]... from input.json and translation.json")
input("Press any [Enter] to start")
count=0
length=0
variantsPatterns = []
doneVariants = []
specialNPCs = []
villagerSayings = []
ignore = ["Changelog","READ ME","Variants","Patterns","HHA Themes","HHA Set","HHA Situation","Special NPCs","Villagers Catch Phrase"]
with open('input.json', encoding='utf-8-sig') as d:
    data = json.load(d)
    with open('translation.json', encoding='utf-8-sig') as t:
        translation = json.load(t)
        
        for dataSheet in data:
            for datum in data[dataSheet]:
                for translationSheet in translation:
                    if(translationSheet in ignore):
                        continue
                    for translate in translation[translationSheet]:
                        if(datum.get("Name")==None or translate.get("English")==None):
                            break
                        elif(datum.get("Name")==translate.get("English")):
                            datum.update(translate)

            length+=1
            print(str(int(length/len(data)*100))+"%")

        for translationSheet in translation:
            for translate in translation[translationSheet]:
                if("Variants" in translationSheet or
                    "Patterns" in translationSheet or
                    "HHA Themes" in translationSheet or
                    "HHA Set" in translationSheet or
                    "HHA Situation" in translationSheet):
                    if(translate.get("English") in doneVariants):
                        continue
                    else:
                        doneVariants.append(translate.get("English"))
                        variantsPatterns.append(translate)
                elif("Special NPCs" in translationSheet):
                    specialNPCs.append(translate)
                elif("Villagers Catch Phrase" in translationSheet):
                    villagerSayings.append(translate)
                
        with open('data.json', 'w', encoding='utf8') as json_file:
            json.dump(data, json_file, ensure_ascii=False,indent=2)
        with open('variantsTranslated.json', 'w', encoding='utf8') as json_file:
            json.dump(variantsPatterns, json_file, ensure_ascii=False,indent=2)
        with open('specialNPCs.json', 'w', encoding='utf8') as json_file:
            json.dump(specialNPCs, json_file, ensure_ascii=False,indent=2)
        with open('villagerCatchPhrasesTranslated.json', 'w', encoding='utf8') as json_file:
            json.dump(villagerSayings, json_file, ensure_ascii=False,indent=2)
        input("Done")

                        
                    
