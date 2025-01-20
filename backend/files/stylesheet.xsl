<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:f="http://www.w3.org/2005/xpath-functions"
  exclude-result-prefixes="xs"
  version="3.0">

  <xsl:param name="jsonData" as="xs:string" />
  <!-- <xsl:param name="name" as="xs:string"/> -->
  <xsl:output method="xml" indent="yes" />

  <xsl:template
    match="/">
    <xsl:variable name="jsonXml" select="json-to-xml($jsonData)" />
    <petSearchRequest>
      <metadata>
        <requestTimestamp>#timestamp#</requestTimestamp>
        <correlationId>#requestId#</correlationId>
      </metadata>
      <data>
        <pet>
          <xsl:value-of select="$jsonXml/f:map/f:string[@key='pet']" />
        </pet>
        <searchCriteria>
          <xsl:for-each select="$jsonXml/f:map/f:map[@key='searchCriteria']/*">
            <criterion>
              <key>
                <xsl:value-of select="@key" />
              </key>
              <value>
                <xsl:choose>
                  <xsl:when test="self::f:string or self::f:number or self::f:boolean">
                    <xsl:value-of select="." />
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:message terminate="yes">
                      <xsl:text>Unsupported data type found: </xsl:text>
                      <xsl:value-of select="name()" />
                      <xsl:text> for key: </xsl:text>
                      <xsl:value-of
                        select="@key" />
                    </xsl:message>
                  </xsl:otherwise>
                </xsl:choose>
              </value>
            </criterion>
          </xsl:for-each>
        </searchCriteria>
      </data>
    </petSearchRequest>
  </xsl:template>
</xsl:stylesheet>