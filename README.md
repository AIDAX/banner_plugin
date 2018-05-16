## Intercept banner impressions/interactions

> Add the attribute data-ax-content-view to the banner container and data-ax-content-click to the banner link

```html
<div data-ax-content-view="BANNER TITLE" data-ax-content-cost="10" data-ax-content-cost-type="cpc">
    <img src="http://test.com/test.png">
    <a href="http://calltoaction.com" data-ax-content-click="BANNER TITLE">Click here</a>
</div>
```

With this setup, AIDAX will send two events: "banner: BANNER TITLE" when the visitor sees the banner and "banner:clicked:BANNER TITLE" when the visitor clicks the banner.

* AIDAX intercepts a impression if at least 100px of the banner is visible on the user viewport.

* AIDAX won't intercept banners without a title on the data-ax-content-view and data-ax-content-click attributes. Titles should have 30 characters at maximum.

* AIDAX inserts a 300ms delay on banner links to allow the impression interception.
