
partial class usercontrols_css
    inherits system.web.ui.usercontrol
    protected sub page_load(sender as object, e as eventargs) handles me.Load

        Dim currentUrl As String = Request.Url.AbsoluteUri
        If currentUrl.IndexOf("?") > -1 Then
            currentUrl = currentUrl.Substring(0, currentUrl.IndexOf("?"))
        End If
        Dim absPath = Request.Url.AbsolutePath.ToLower()
        If (configurationmanager.appsettings("updatechannel") = "Beta") or (configurationmanager.appsettings("updatechannel") = "beta") then
            ' demo

            devmain.attributes("href") = "/themes/" & antilles.theme.getthemename & "/assets/dist/css/main.css?v=" & io.file.getlastwritetime(mappath("/themes/" & antilles.theme.getthemename & "/assets/dist/css/main.css")).tostring("yyyymmddhhmmss")

            devmain.visible = True
            If Request.Path = "/" Or absPath = "home" Or absPath = "home/" Then
                devhomepage.Visible = True
                devhomepage.Attributes("href") = "/themes/" & Antilles.theme.getThemeName & "/assets/dist/css/homepage.css?v=" & IO.File.GetLastWriteTime(MapPath("/themes/" & Antilles.theme.getThemeName & "/assets/dist/css/homepage.css")).ToString("yyyymmddhhmmss")
            Else
                devsubpage.visible = true
                devsubpage.attributes("href") = "/themes/" & antilles.theme.getthemename & "/assets/dist/css/subpage.css?v=" & io.file.getlastwritetime(mappath("/themes/" & antilles.theme.getthemename & "/assets/dist/css/subpage.css")).tostring("yyyymmddhhmmss")
            end if
        else
            ' production
            prodmain.attributes("href") = "/themes/" & antilles.theme.getthemename & "/assets/dist/css/main.min.css?v=" & io.file.getlastwritetime(mappath("/themes/" & antilles.theme.getthemename & "/assets/dist/css/main.min.css")).tostring("yyyymmddhhmmss")

            prodmain.visible = true
            if Request.Path = "/" Or absPath = "home" Or absPath = "home/" then
                prodhomepage.visible = true
                prodhomepage.attributes("href") = "/themes/" & antilles.theme.getthemename & "/assets/dist/css/homepage.min.css?v=" & io.file.getlastwritetime(mappath("/themes/" & antilles.theme.getthemename & "/assets/dist/css/homepage.min.css")).tostring("yyyymmddhhmmss")
            else
                prodsubpage.visible = true
                prodsubpage.attributes("href") = "/themes/" & antilles.theme.getthemename & "/assets/dist/css/subpage.min.css?v=" & io.file.getlastwritetime(mappath("/themes/" & antilles.theme.getthemename & "/assets/dist/css/subpage.min.css")).tostring("yyyymmddhhmmss")
            end if
        end if


    end sub
end class
