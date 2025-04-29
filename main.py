from fastapi import FastAPI, Request, Form, status
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


app = FastAPI()

# Serve static files from the 'static' directory
app.mount("/static", StaticFiles(directory="static"), name="static")

# Use templates from the 'templates' directory
templates = Jinja2Templates(directory="templates")

# Static team data
team_members = [
    {
        "name": "Anonymous",
        "role": "ADMIN",
        "subtitle": "",
        "image": "images/team/AI-HUB.jpg",
        "github": "https://github.com",
        "linkedin": "https://www.linkedin.com",
        "email": "mailto:"
    },
    {
        "name": "Bhargav Anugolu",
        "role": "MENTOR",
        "subtitle": "",
        "image": "images/team/BhargavVenkatA.jpg",
        "github": "https://github.com/smashcoder2003",
        "linkedin": "https://www.linkedin.com",
        "email": "mailto:"
    },
    {
     "name": "Maheswara Chowdary ",
        "role": "MENTOR",
        "subtitle": "Data Engineering Specialist, British Telecom [BT]",
        "image": "images/team/maheswara3_1.jpg",
        "github": "https://github.com",
        "linkedin": "https://www.linkedin.com",
        "email": "mailto:"
    },
    { "name": "Sai Kumar Seela",
        "role": "MENTOR",
        "subtitle": "AI Engineer at Dyota Labs",
        "image": "images/team/sai Kumar.jpeg",
        "github": "https://github.com/saikumarseela",
        "linkedin": "https://www.linkedin.com/in/saikumarseela/",
        "email": "mailto:workwithsaikumar@gmail.com"
    },
    {
         "name": "Pisupati Veda Rama Charan",
        "role": "MENTOR",
        "subtitle": "22BQ1A42C2",
        "image": "images/team/AI-HUB.jpg",
        "github": "https://github.com/Epik-Whale463",
        "linkedin": "https://www.linkedin.com/in/rama-charan-50425021b/",
        "email": "mailto:pvrcharan2022@gmail.com"
    },
    {
     "name": "Kasa Harendra",
        "role": "Team: Interface Designer",
        "subtitle": "23BQ1A4274",
        "image": "images/team/Harendra4274(1).jpg",
        "github": "https://github.com/Kasa-Harendra",
        "linkedin": "https://www.linkedin.com",
        "email": "mailto:harendrakasa@gmail.com"
    },
    {
         "name": "Harsha Vardhan E",
        "role": "Team: Interface Designer",
        "subtitle": "23BQ1A4261",
        "image": "images/team/no img.png",
        "github": "https://github.com/harsha4261",
        "linkedin": "https://www.linkedin.com/in/harsha-vardhan-reddy-emani-0a61701b8/",
        "email": "mailto:23bq1a4261@vvit.net"
    },
    {
         "name": "B Vamsi Krishna ",
        "role": "Team: Interface Designer",
        "subtitle": "23BQ1A4223",
        "image": "images/team/Vamsi.jpg",
        "github": "https://github.com/69492",
        "linkedin": "https://www.linkedin.com",
        "email": "mailto:"
    },
    {
         "name": "Bitra Jayasri",
        "role": "Team: Career Catalysts",
        "subtitle": "23BQ1A4221",
        "image": "images/team/Jayasri.jpg",
        "github": "https://github.com/JayaSriBitra",
        "linkedin": "https://www.linkedin.com",
        "email": "mailto:"
    },
    {
         "name": "Bhuvanagiri Bhavani",
        "role": "Team: Career Catalysts",
        "subtitle": "23BQ1A4219",
        "image": "images/team/Bhavani4219.jpg",
        "github": "https://github.com/bhuvanagiribhavani",
        "linkedin": "https://www.linkedin.com",
        "email": "mailto:"
    },
    {
         "name": "Bitra Bhavani",
        "role": "Team: Career Catalysts",
        "subtitle": "23BQ1A4220",
        "image": "images/team/Bhavani4220.jpg",
        "github": "https://github.com/smashcoder2003",
        "linkedin": "https://www.linkedin.com",
        "email": "mailto:"
    },
    {
        "name": "N Sampath Kumar",
        "role": "Team: Career Catalysts",
        "subtitle": "23BQ1A42B8",
        "image": "images/team/sampath42b8.jpg",
        "github": "https://github.com/sampath-create",
        "linkedin": "https://www.linkedin.com",
        "email": "mailto:sampath2005h@gmail.com"
    },
    {
        "name": "M Jagadeeswar",
        "role": "Team: Career Catalysts",
        "subtitle": "23BQ1A42B4",
        "image": "images/team/Jagadeeswar42b4.jpg",
        "github": "https://github.com/jaggu512",
        "linkedin": "https://www.linkedin.com/in/jagadeeswar-munagala-535788290/",
        "email": "mailto:jagadeeswarmunagala7@gmail.com"
    },
    {
        "name": "M Asritha",
        "role": "Team: Career Catalysts",
        "subtitle": "23BQ1A42B7",
        "image": "images/team/Asritha42b7.jpg",
        "github": "https://github.com/asrithamurikipudi26",
        "linkedin": "https://www.linkedin.com",
        "email": "mailto:asrithamurikipudi@gmail.com"
    },
    {
        "name": "K Krupavathi",
        "role": "Team: Apps Developer",
        "subtitle": "23BQ1A4275",
        "image": "images/team/Krupavathi.jpg",
        "github": "https://github.com",
        "linkedin": "https://www.linkedin.com",
        "email": "mailto:"
    },
    {
        "name": "Bhargav Sai",
        "role": "Team: Apps Developer",
        "subtitle": "23BQ1A4201",
        "image": "images/team/Bhargav sai 4201.jpg",
        "github": "https://github.com",
        "linkedin": "https://www.linkedin.com",
        "email": "mailto:"
    },
    {
        "name": "Manasa Murakonda",
        "role": "Team: Apps Developer",
        "subtitle": "23BQ1A42B6",
        "image": "images/team/Manasa.jpg",
        "github": "https://github.com/manasamurakonda",
        "linkedin": "http://www.linkedin.com/in/murakonda-manasa-9a79482a9",
        "email": "mailto:murakondamanasa@gmail.com"
    },
    {
        "name": "Ch Nissi",
        "role": "Team: Interface Designer",
        "subtitle": "23BQ1A4233",
        "image": "images/team/AI-HUB.jpg",
        "github": "https://github.com/Nissi1513",
        "linkedin": "http://www.linkedin.com/in/murakonda-manasa-9a79482a9",
        "email": "mailto:Chirugurinissi2@gmail.com"
    }
]

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/index", response_class=HTMLResponse)
async def index_page(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/about", response_class=HTMLResponse)
async def about(request: Request):
    return templates.TemplateResponse("About.html", {"request": request, "team_members": team_members})

@app.get("/apps", response_class=HTMLResponse)
async def apps(request: Request):
    return templates.TemplateResponse("Apps.html", {"request": request})

@app.get("/blog", response_class=HTMLResponse)
async def blog(request: Request):
    return templates.TemplateResponse("blog.html", {"request": request})

@app.get("/blog_viewer", response_class=HTMLResponse)
async def blog_viewer(request: Request):
    return templates.TemplateResponse("blog_viewer.html", {"request": request})

@app.get("/career", response_class=HTMLResponse)
async def career(request: Request):
    return templates.TemplateResponse("Career.html", {"request": request})

@app.get("/events", response_class=HTMLResponse)
async def events(request: Request):
    return templates.TemplateResponse("Events.html", {
        "request": request,
    })

@app.get("/game", response_class=HTMLResponse)
async def game(request: Request):
    return templates.TemplateResponse("Game.html", {"request": request})
@app.get("/meetups", response_class=HTMLResponse)
async def meetups(request: Request):
    return templates.TemplateResponse("Meetups.html", {
        "request": request,
    })

@app.get("/news", response_class=HTMLResponse)
async def news(request: Request):
    return templates.TemplateResponse("News.html", {"request": request})

@app.get("/projects", response_class=HTMLResponse)
async def projects(request: Request):
    return templates.TemplateResponse("Projects.html", {"request": request})
