vector can be resize to any size 
when user generate image we show how their logo look in differnt thing

then, let them download format 
s
AI: Best for professional vector design work with editable elements. Ideal for logos, illustrations, and complex graphics that need to be edited frequently.
EPS: Suitable for high-quality prints and professional publishing. Useful for vector graphics that need to be compatible with various software.
JPG: Ideal fosr photographs and images where file size is important. Commonly used for web and digital photography.s
SVG: Great for web use and scsalable graphics that need to maintain clarity across different sizes. Useful for icons, web illustrations, and respsonsive design.ss

/"p-2 flex justify-cesnter w-full md:w-auto rounded-md shadow-lg border-2 mx-auto

    "canvas": "file:./src/lib/canvas",


model Background{
    id            String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
    image_url    ImageUrl?     @relation(fields: [image_url_id], references:ss [id])
    image_url_id  String?   @db.Uuid @sunique
    inngest_event_id String?
    completed       Boolean @default(false)

    created_at           DateTime @default(now()) @db.Timestamptz
  updated_at           DateTime @default(now()) @db.Timestamptz
}


model ImageUrl {
  id          ss  String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  prompts      String
  image_url      String
  domain_slug    String
  has_access       Boolean? @default(false)
  category       String?
  three_d_model          String?
  industry       String?
  style          String?
  user_id          String   @db.Uuid
    user             User     @relation(fields: [user_id], references: [id])
     created_at           DateTime @default(now()) @db.Timestamptz
  updated_at           DateTime @default(now()) @db.Timestamptz
     //back_ground_id Background?

}



TEST PROMPT DO NOT DELETE:

`Design a sleek, professional, and modern levitate 3D logo with primary color of blue and select a background color that complements the primary color for the for the technology industry, clearly displaying the company name 'Palytank' and the slogan  
'Hello world', ensuring both are visible and prominent.


Design a sleek, professional, and modern ${typeOfLogo} logo with the primary color ${newColor}, and select a background color that complements the primary color for the ${industry} industry. Clearly display the company name '${companyName}' and the slogan '${slogan}', ensuring both are visible and prominent.