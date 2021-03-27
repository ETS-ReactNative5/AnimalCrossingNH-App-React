import json
import codecs

print("Matching [Name] and [English]... from data.json and translations.json")
count=0
length=0
outputDictionary = {}
ignore = ["Changelog","READ ME","Variants","Patterns","HHA Themes","HHA Set","HHA Situation","Special NPCs","Villagers Catch Phrase"]
with open('data.json', encoding='utf-8-sig') as d:
    data = json.load(d)
with open('translations.json', encoding='utf-8-sig') as t:
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
                    #datum.update(translate)                            
                    outputDictionary[translate.get("English")] = translate

    length+=1
    print(str(int(length/len(data)*100))+"%")
    
with open('Generated/translatedItems.json', 'w', encoding='utf8') as json_file:
    json.dump(outputDictionary, json_file, ensure_ascii=False,indent=2)


doneVariants = []
outputVariantsPatterns = {}
outputSpecialNPCs = {}
outputVillagerSayings = {}
length = 0
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
                outputVariantsPatterns[translate.get("English")] = translate
        elif("Special NPCs" in translationSheet):
            outputSpecialNPCs[translate.get("English")] = translate
        elif("Villagers Catch Phrase" in translationSheet):
            outputVillagerSayings[translate.get("English")] = translate
    length+=1
    print(str(int(length/len(translation)*100))+"%")
    
with open('Generated/translatedVariants.json', 'w', encoding='utf8') as json_file:
    json.dump(outputVariantsPatterns, json_file, ensure_ascii=False,indent=2)
with open('Generated/translatedSpecialNPCs.json', 'w', encoding='utf8') as json_file:
    json.dump(outputSpecialNPCs, json_file, ensure_ascii=False,indent=2)
with open('Generated/translatedVillagerCatchPhrases.json', 'w', encoding='utf8') as json_file:
    json.dump(outputVillagerSayings, json_file, ensure_ascii=False,indent=2)

input("Done")

                        
                    