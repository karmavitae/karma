export class Global {
    public static isProduction = false
    public static url = 'https://www.karmavitae.com'
    public static apiUrl = Global.isProduction ? Global.url + '/api/' : '/api/'
    public static userUrl = Global.isProduction ? Global.url + '/user/' : '/user/'
    public static infoUrl = Global.isProduction ? Global.url + '/info/' : '/info/'
    public static authUrl = Global.isProduction ? Global.url + '/auth/' : '/auth/'
    public static findUrl = Global.isProduction ? Global.url + '/find/' : '/find/'

    public static levels =  [
    { id: 'GM', name: 'Grand Master', hours: 30000, color: '#6f0bff', count: 0, yOffset: 0, xCoefficient: 0},
    { id: 'MA', name: 'Master', hours: 20000, color: '#0B21FF', count: 0, yOffset: 0, xCoefficient: 1},
    { id: 'SP', name: 'Specialist', hours: 10000, color: '#21BAF1', count: 0, yOffset: 0, xCoefficient: 2},
    { id: 'EX', name: 'Expert', hours: 5000, color: '#00cc7e', count: 0, yOffset: 0, xCoefficient: 3},
    { id: 'AD', name: 'Advanced', hours: 1000, color: '#F1C021', count: 0, yOffset: 0, xCoefficient: 0},
    { id: 'BE', name: 'Beginner', hours: 500, color: '#F15921', count: 0, yOffset: 0, xCoefficient: 1}, 
    { id: 'TR', name: 'Trainee', hours: 250, color: '#F12152', count: 0, yOffset: 0, xCoefficient: 2},
    { id: '-', name: 'Unallocated', hours: 0, color: '#dad5d4', count: 0, yOffset: 0, xCoefficient: 3},
    ]

    public static chartColours=[ "#3410b3", "#4314eb", "#7b5bf1", "#b4a1f7", "#d9d0fb" ]
    
}