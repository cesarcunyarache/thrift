import {
    Body,

    Container,
    Head,

    Html,
    Img,
    Preview,

    Text,
} from "@react-email/components";

import * as React from "react";

interface EmailTemplateProps {
    userFirstname?: string | null;
    title: string;
    description?: string | null;
}

/* const baseUrl = process.env.NEXT_PUBLIC_APP_URL
    ? process.env.NEXT_PUBLIC_APP_URL
    : ""; */

export const EmailTemplate = ({
    userFirstname, title, description
}: EmailTemplateProps) => (
    <Html>
        <Head />
        <Preview>
            The sales intelligence platform that helps you uncover qualified leads.
        </Preview>
        <Body style={main}>
            <Container style={container}>
                <Container style={containerLogo}>
                    <Img
                        src={`https://res.cloudinary.com/dboweswio/image/upload/v1732147029/bed7vkurceepoywukiru.png`}
                        width="50"
                        height="50"
                        alt="Logo Thift"
                        style={logo}
                    />

                    <Text style={titleOne}>Thift</Text>
                </Container>

                <Text style={paragraph}>Hola {userFirstname},</Text>
                <Text style={paragraph}>
                ¡Atención! Tienes un nuevo recordatorio. <br />
                </Text>

                <Text style={titulo}>
               {title}<br />
                </Text>
                <Text style={paragraph}>
                    {description} <br />
              
                </Text>
               {/*  <Section style={btnContainer}>
                    <Button style={button} href={baseUrl}>
                        Entra a tu cuenta
                    </Button>
                </Section> */}
               {/*  <Text style={paragraph}>
                    Best,
                    <br />
                    The Koala team
                </Text>
                <Hr style={hr} /> */}
              {/*   <Text style={footer}>
                    470 Noor Ave STE B #1148, South San Francisco, CA 94080
                </Text> */}
            </Container>
        </Body>
    </Html>
);

EmailTemplate.PreviewProps = {
    userFirstname: "Alan",
} as EmailTemplateProps;

export default EmailTemplate;

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const containerLogo = {
    display: "flex",
    margin: "0 auto",
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

const titulo = {
    fontSize: "20px",
    fontWeight: "bold",
}

const titleOne = {
    fontSize: "24px",
    fontWeight: "bold",
}

const logo = {
    margin: "0",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};

/* const btnContainer = {
    textAlign: "center" as const,
}; */

/* const icon = {
    border: "1px solid #cccccc",
    borderRadius: "50%",
    height: "16px",
} */

/* const button = {
    backgroundColor: "#000",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
}; */

/* const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
}; */
/* 
const footer = {
    color: "#8898aa",
    fontSize: "12px",
}; */
