# nginx-logfile-visualizer
Simple app to visualize an uploaded nginx log file. The parsing of the log file is handled completely client side, by utilizing web worker to asynchronous parse the given file. On top there is a simple fuzzy search included and also the columns are sortable. By default, only german IP addresses are displayed.

> **HINT**
> Is not tested against big log files, so assume it will break/be unusable by using with large log files.

> **HINT**
> Its using [ipapi](https://ipapi.co/) to check if ip is a german ip address. So beware that its just using the free tier.

> **HINT**
> Only tested on latest Opera and Chrome

# Get Started
```
npm install
npm start # to start dev server on port 5000
npm run build # to build the app to the `dist` folder
```

## TODO
They are a couple of things to do, to improve the usage and performance.

- [ ] Add tests to make sure it works as it should
- [ ] Make filter by german ip address optional
- [ ] Allow filter by other countries
- [ ] Try to filter ips by not using a third party api or at least have a bulk check endpoint to avoid a http call for every single line
- [ ] Paginate result, to allow to work with larger log files
